
import datetime as dt
import json
import time

from flask_apispec import doc, marshal_with, use_kwargs
from flask_apispec.views import MethodResource
from flask_restful import Resource
from marshmallow import Schema, fields
from openfabric_pysdk.json import PJSON
from openfabric_pysdk.manifest import manifest


class Image:
	input_type: PyJSON = None
	output_type: PyJSON = None
	execution_function = None

	def __init__(self, name, image):
		self.name = name
		self.image = image

	def __repr__(self):
		return "<User(name={self.name!r})>".format(self=self)

class imageSchema(Schema):
	name = fields.Str()
	image = fields.Raw(type='file')


class Images(MethodResource, Resource):
	@doc(description="Input/Output definition", tags=[manifest.get("overview")])
	@marshal_with(imageSchema)  # marshalling
	def get(self):
		return {
			'image': 'image',
			}

	@doc(description="Entrypoint", tags=[manifest.get("overview")])
	@use_kwargs(imageSchema, location='json')
	# @use_kwargs({'json_data': fields.Field(validate=lambda file: file.mimetype == 'application/json', location="files")})
	@marshal_with(imageSchema)  # marshalling
	def post(self, **kwargs) -> Image:

		# input_file = open ('api/data.json')
		# json_array = json.load(input_file)

		# myArray = []
		# for item in json_array:
		# 	store_details = {"name":None, "image":None}
		# 	store_details['name'] = item['name']
		# 	store_details['image'] = item['image']
		# 	myArray.append(store_details)


		# temp = dict()
		# temp['name']=kwargs['name']
		# image = kwargs['image']
		# image = image.replace('data:image/jpeg;base64,','')
		# temp['image'] = image
		# myArray.append(temp)
		
		# with open('api/data.json', 'w') as my_file:
		# 	json.dump(myArray, my_file)
		# input_file.close()
		# return {
		# 	'name':kwargs['name'],
		# 	'image':kwargs['image']
		# 	}
		return {
			'name':kwargs['name'],
			'image':kwargs['image']
			}
