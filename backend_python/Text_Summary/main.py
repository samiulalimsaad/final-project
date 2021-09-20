from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

from flask import request
from sumy.nlp.stemmers import Stemmer
from sumy.nlp.tokenizers import Tokenizer
from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.utils import get_stop_words

LANGUAGE = "english"
SENTENCES_COUNT = 10

import nltk

nltk.download('punkt')

def getSummary(parser):
    stemmer = Stemmer(LANGUAGE)

    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)
    output= ""
    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        output += ' '.join(sentence.words) + '.'
    return output

def Text_Summary_Post():
    body = request.get_json(force=True)
    if "url" in body:
        url = body["url"]
        parser = HtmlParser.from_url(url, Tokenizer(LANGUAGE))
        return {"summary": getSummary(parser),'success':True}
    if "text" in body:
        text =  body["text"]
        parser = PlaintextParser.from_string(text, Tokenizer(LANGUAGE))
        return {"summary": getSummary(parser),'success':True}
    else:
        return {"error":"Only [text] & [url] Acceptable", 'success':False}

    
        
