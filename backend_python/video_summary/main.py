import os
from time import time

import validators
from flask import make_response, request, send_file

from video_summary.sum import getVideoSummarize


def Post_Video_Summary():
    body = request.get_json(force=True)
    print('body = ',body)
    url = body.get("url")
    
    if url:
        if validators.url(url):
            vid_name = str(round(time() * 1000))
            res = getVideoSummarize(url, vid_name=vid_name)
            path = request.host_url
            return {"message":f"{path}vidsum/video/" + res, 'success':True}
        else:
            return {"message": "invalid url",'success':True}           


    else:
        return {"error":"Only [url] key Acceptable", 'success':False}

    

def Get_Video_Summary(vid_name):
    base_dir = os.path.dirname(os.path.realpath(__file__))

    video = os.path.join(base_dir+'/video', str(vid_name))
    resp = make_response(send_file(video+'.mp4', 'video/mp4'))
    resp.headers['Content-Disposition'] = 'inline'
    return resp
