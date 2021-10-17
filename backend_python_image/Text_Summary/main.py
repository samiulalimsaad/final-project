from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import validators
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
    url = body.get("url")
    text =  body.get("text")
    if url:
        if validators.url(url):
            parser = HtmlParser.from_url(url, Tokenizer(LANGUAGE))
            return {"message": getSummary(parser),'success':True}
        else:
            return {"message": "invalid url",'success':True}
    if text:
        parser = PlaintextParser.from_string(text, Tokenizer(LANGUAGE))
        return {"message": getSummary(parser),'success':True}
    else:
        return {"error":"Only [text] & [url] Acceptable", 'success':False}

    
        
