import os

import openfabric_pysdk
from flask import Flask, make_response, send_file

if __name__ == '__main__':
    from openfabric_pysdk.register import OpenfabricRegister

    from main import execute, get_input_type, get_output_type

    OpenfabricRegister.input_type = get_input_type()
    OpenfabricRegister.output_type = get_output_type()
    OpenfabricRegister.execution_function = execute
    
    
    
    from openfabric_pysdk.starter import OpenfabricStarter, app
    base_dir = os.path.dirname(os.path.realpath(__file__))

    @app.route('/video/<vid_name>')
    def serve_video(vid_name):
        video = os.path.join(base_dir+'/video', vid_name)
        resp = make_response(send_file(video+'.mp4', 'video/mp4'))
        resp.headers['Content-Disposition'] = 'inline'
        return resp
    
    OpenfabricStarter.ignite(debug=False, host="0.0.0.0")
    

