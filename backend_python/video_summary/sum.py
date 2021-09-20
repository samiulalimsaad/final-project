#!/usr/bin/env python
from __future__ import unicode_literals

import multiprocessing
import os
import re
from itertools import starmap
from random import randint

import chardet
import imageio
import nltk
import pysrt
import youtube_dl
from flask import abort

imageio.plugins.ffmpeg.download()
nltk.download('punkt')

from moviepy.editor import VideoFileClip, concatenate_videoclips
from sumy.nlp.stemmers import Stemmer
from sumy.nlp.tokenizers import Tokenizer
from sumy.parsers.plaintext import PlaintextParser
from sumy.summarizers.lsa import LsaSummarizer
from sumy.utils import get_stop_words

imageio.plugins.ffmpeg.download()


def summarize(srt_file, n_sentences, language="english"):
    """ Generate segmented summary

    Args:
        srt_file(str) : The name of the SRT FILE
        n_sentences(int): No of sentences
        language(str) : Language of subtitles (default to English)

    Returns:
        list: segment of subtitles

    """
    parser = PlaintextParser.from_string(srt_to_txt(srt_file), Tokenizer(language))
    stemmer = Stemmer(language)
    summarizer = LsaSummarizer(stemmer)
    summarizer.stop_words = get_stop_words(language)
    segment = []
    for sentence in summarizer(parser.document, n_sentences):
        index = int(re.findall("\(([0-9]+)\)", str(sentence))[0])
        item = srt_file[index]
        segment.append(srt_segment_to_range(item))
    return segment


def srt_to_txt(srt_file):
    """ Extract text from subtitles file

    Args:
        srt_file(str): The name of the SRT FILE

    Returns:
        str: extracted text from subtitles file

    """
    text = ''
    for index, item in enumerate(srt_file):
        if item.text.startswith("["):
            continue
        text += "(%d) " % index
        text += item.text.replace("\n", "").strip("...").replace(".", "").replace("?", "").replace("!", "")
        text += ". "
    return text


def srt_segment_to_range(item):
    """ Handling of srt segments to time range

    Args:
        item():

    Returns:
        int: starting segment
        int: ending segment of srt

    """
    start_segment = item.start.hours * 60 * 60 + item.start.minutes * 60 + item.start.seconds + item.start.milliseconds / 1000.0
    end_segment = item.end.hours * 60 * 60 + item.end.minutes * 60 + item.end.seconds + item.end.milliseconds / 1000.0
    return start_segment, end_segment


def time_regions(regions):
    """ Duration of segments

    Args:
        regions():

    Returns:
        float: duration of segments

    """
    return sum(starmap(lambda start, end: end - start, regions))


def find_summary_regions(srt_filename, duration=30, language="english"):
    """ Find important sections

    Args:
        srt_filename(str): Name of the SRT FILE
        duration(int): Time duration
        language(str): Language of subtitles (default to English)

    Returns:
        list: segment of subtitles as "summary"

    """
    srt_file = pysrt.open(srt_filename)

    enc = chardet.detect(open(srt_filename, "rb").read())['encoding']
    srt_file = pysrt.open(srt_filename, encoding=enc)

    # generate average subtitle duration
    subtitle_duration = time_regions(map(srt_segment_to_range, srt_file)) / len(srt_file)
    # compute number of sentences in the summary file
    n_sentences = duration / subtitle_duration
    summary = summarize(srt_file, n_sentences, language)
    total_time = time_regions(summary)
    too_short = total_time < duration
    if too_short:
        while total_time < duration:
            n_sentences += 1
            summary = summarize(srt_file, n_sentences, language)
            total_time = time_regions(summary)
    else:
        while total_time > duration:
            n_sentences -= 1
            summary = summarize(srt_file, n_sentences, language)
            total_time = time_regions(summary)
    return summary


def create_summary(filename, regions):
    """ Join segments

    Args:
        filename(str): filename
        regions():
    Returns:
        VideoFileClip: joined subclips in segment

    """
    subclips = []
    input_video = VideoFileClip(filename)
    last_end = 0
    for (start, end) in regions:
        subclip = input_video.subclip(start, end)
        subclips.append(subclip)
        last_end = end
    return concatenate_videoclips(subclips)


def get_summary(filename="1.mp4", subtitles="1.srt", vid_name='1'):
    """ Abstract function

    Args:
        filename(str): Name of the Video file (defaults to "1.mp4")
        subtitles(str): Name of the subtitle file (defaults to "1.srt")

    Returns:
        True

    """
    regions = find_summary_regions(subtitles, 60, "english")
    try:
        summary = create_summary(filename, regions)
    except :
        raise("Video must have an English subtitle")
    base, ext = os.path.splitext(filename)
    base_dir = os.path.dirname(os.path.realpath(__file__))
    video = os.path.join(base_dir+'/video')
    output = f"{video}/"+vid_name+".mp4"
    summary.to_videofile(output, codec="libx264", temp_audiofile="temp.m4a", remove_temp=True, audio_codec="aac")
    return True


def download_video_srt(url):
    """ Downloads specified Youtube video's subtitles as a vtt/srt file.

    Args:
        subs(str): Full url of Youtube video

    Returns:
        True


    The video will be downloaded as 1.mp4 and its subtitles as 1.(lang).srt
    Both, the video and its subtitles, will be downloaded to the same location
    as that of this script (sum.py)

    """
    ydl_opts = {
        'format': 'best',
        'outtmpl': '1.%(ext)s',
        'subtitlesformat': 'srt',
        'writeautomaticsub': True,
        # 'allsubtitles': True # Get all subtitles
    }

    movie_filename = ""
    subtitle_filename = ""
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        # ydl.download([subs])
        result = ydl.extract_info("{}".format(url), download=True)
        movie_filename = ydl.prepare_filename(result)
        subtitle_info = result.get("requested_subtitles")
        subtitle_language = list(subtitle_info.keys())[0]
        subtitle_ext = subtitle_info[subtitle_language]['ext']
        subtitle_filename = movie_filename.replace(".mp4", ".%s.%s" %(subtitle_language, subtitle_ext))
    return movie_filename, subtitle_filename


def getVideoSummarize(url, vid_name):

    movie_filename, subtitle_filename = download_video_srt(url)
    mov_name = movie_filename.replace('1',vid_name)
    sub_name = subtitle_filename.replace('1',vid_name)
    os.rename(movie_filename,mov_name)
    os.rename(subtitle_filename, sub_name)
    
    summary_retrieval_process = multiprocessing.Process(target=get_summary, args=(mov_name,sub_name,vid_name))
    summary_retrieval_process.start()
    summary_retrieval_process.join()
    os.remove(mov_name)
    os.remove(sub_name)
    print("[sum.py] Remove the original files")
    return vid_name





