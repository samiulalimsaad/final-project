from random import randint
from time import time
from flask import request

from sum import getVideoSummarize


def execute():
    vid_name = str(round(time() * 1000))

    res = getVideoSummarize(_input.location, vid_name=vid_name)
    path = request.host_url
    return Url(dict(location=f"{path}video/" + res))

class GetVideoSummary():
    def post(self):
        body = request.get_json(force=True)
        # body = PyJSON(body)
        print('body = ',body)
        if "url" in body:
            url = json.dumps(body["url"])
            url = "https://en.wikipedia.org/wiki/Automatic_summarization"
            print('url = ',url)
            parser = HtmlParser.from_url(url, Tokenizer(LANGUAGE))
            sumy = getSummary(parser)
            print(sumy)
            return {"summary":sumy, 'success':True}

        else:
            return {"error":"Only url key Acceptable", 'success':False}

    
    def get(self):
        return {'Text': 'Summary POST request','success':True}