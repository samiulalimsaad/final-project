from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

import logging

from config import get_input_type, get_output_type
from sumy.nlp.stemmers import Stemmer
from sumy.nlp.tokenizers import Tokenizer
from sumy.parsers.plaintext import PlaintextParser
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.utils import get_stop_words

from ontology_dc8f06af066e4a7880a5938933236037.simple_text import SimpleText

LANGUAGE = "english"
SENTENCES_COUNT = 10

import nltk

nltk.download('punkt')


# Callback function representing the main execution entry point
def execute(_input: get_input_type()) -> get_output_type():
    # url = "https://en.wikipedia.org/wiki/Automatic_summarization"
    # parser = HtmlParser.from_url(url, Tokenizer(LANGUAGE))
    # or for plain text files
    # parser = PlaintextParser.from_file("document.txt", Tokenizer(LANGUAGE))

    output = []
    for text in _input.text:

        size = (len(text) / 1024)
        logging.info(f"Summarize text {size} KB size")

        parser = PlaintextParser.from_string(text, Tokenizer(LANGUAGE))
        stemmer = Stemmer(LANGUAGE)

        summarizer = Summarizer(stemmer)
        summarizer.stop_words = get_stop_words(LANGUAGE)

        out_text = ""
        for sentence in summarizer(parser.document, SENTENCES_COUNT):
            out_text += ' '.join(sentence.words) + '.'
        output.append(out_text)

    return SimpleText(dict(text=output))
