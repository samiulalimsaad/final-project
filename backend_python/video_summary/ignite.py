import os

from flask import Flask, make_response, send_file
from main import app
    
if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.realpath(__file__))

    @app.route('/video/<vid_name>')
    def serve_video(vid_name):
        video = os.path.join(base_dir+'/video', vid_name)
        resp = make_response(send_file(video+'.mp4', 'video/mp4'))
        resp.headers['Content-Disposition'] = 'inline'
        return resp
    
    

