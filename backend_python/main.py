
from flask import Flask

from assistant.main import Assistant, wishMe
from Text_Summary.main import Text_Summary_Post
from video_summary.main import Get_Video_Summary, Post_Video_Summary

app = Flask(__name__)


@app.route('/')
def get():
    return {'AI_Assistant': wishMe()}

@app.route('/textsum', methods=["POST"])
def textsum():
    return Text_Summary_Post()

@app.route('/vidsum', methods=["POST"])
def vidsum():
    return Post_Video_Summary()

@app.route('/vidsum/video/<vid_name>')
def serve_video(vid_name):
    return Get_Video_Summary(vid_name=vid_name)

    

@app.route('/assistant', methods=["POST"])
def assistant():
    return Assistant()


if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0")
