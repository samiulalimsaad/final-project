import os

from flask import Flask, make_response, request, send_file
from flask_restful import Api, Resource

from Text_Summary.main import  Text_Summary_Post
from video_summary.main import Get_Video_Summary, Post_Video_Summary

app = Flask(__name__)
api = Api(app)


@app.route('/')
def get():
    print(request)
    return {'hello': 'world'}

@app.route('/textsum', methods=["POST"])
def textsum():
    return Text_Summary_Post()

@app.route('/vidsum', methods=["POST"])
def vidsum():
    return Post_Video_Summary()

base_dir = os.path.dirname(os.path.realpath(__file__))

@app.route('/vidsum/video/<vid_name>')
def serve_video(vid_name):
    return Get_Video_Summary(vid_name=vid_name)

# api.add_resource(Text_Summary, '/textsum')
# api.add_resource(Video_Summary, '/vidsum')
# api.add_resource(Get_Video_Summary, '/vidsum/video/<int:vid_name>')


if __name__ == '__main__':
    app.run(debug=True)
