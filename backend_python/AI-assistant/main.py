
from config import get_input_type, get_output_type
from ontology_dc8f06af066e4a7880a5938933236037.simple_text import SimpleText
from virtual import main


def execute(input_object: get_input_type()) -> get_output_type():
    response = main(input_object.text)
    print(response)
    return SimpleText(dict({'text':response}))


