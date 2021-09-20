from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import json

from flask_restful import Resource, request
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

class Text_Summary(Resource):
    def post(self):
        body = request.get_json(force=True)
        if "url" in body:
            url =  json.dumps(body["url"])
            print(type(url))
            parser = HtmlParser.from_string(url, Tokenizer(LANGUAGE))
            sumy = getSummary(parser)
            return {"summary":sumy,'success':True}
        if "text" in body:
            text =  json.dumps(body["text"])
            parser = PlaintextParser.from_string(text, Tokenizer(LANGUAGE))
            sumy = getSummary(parser)
            return {"summary":sumy,'success':True}

        else:
            return {"error":"Only Text Acceptable", 'success':False}

    
    def get(self):
        return {'Text': 'Summary GET request','success':True}
        
