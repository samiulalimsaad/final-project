from random import randint
from flask import request

from config import get_input_type, get_output_type
# Callback function representing the main execution entry point
from ontology_dc8f06af066e4a7880a5938933236037.url import Url
from sum import getVideoSummarize


def execute(_input: get_input_type()) -> get_output_type():
    vid_name = str(randint(1000,99999))
    res = getVideoSummarize(_input.location, vid_name=vid_name)
    path = request.host_url
    return Url(dict(location=f"{path}video/" + res))
