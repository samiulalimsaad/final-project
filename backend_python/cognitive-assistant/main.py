from config import get_input_type, get_output_type
from ontology_dc8f06af066e4a7880a5938933236037.simple_text import *

from chatbot import Chat, register_call
import wikipedia
import os
import warnings

warnings.filterwarnings("ignore")


# Create a new instance of a ChatBot
@register_call("whoIs")
def who_is(session, query):
    try:
        return wikipedia.summary(query)
    except Exception:
        for new_query in wikipedia.search(query):
            try:
                return wikipedia.summary(new_query)
            except Exception:
                pass
    return "I don't know about " + query


chat = Chat(os.path.join(os.path.dirname(os.path.abspath(__file__)), "Example.template"))


# Callback function representing the main execution entry point
def execute(_input: get_input_type()) -> get_output_type():
    output = []
    for text in _input.text:
        response = chat.say(text)
        output.append(response)
    return SimpleText(dict(text=output))
