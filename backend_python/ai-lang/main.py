from easynmt import EasyNMT
from config import get_input_type, get_output_type
from ontology_62b84150da704af1bf68cdd39bb60ddb.simple_text import SimpleText

model = EasyNMT('opus-mt')


# Callback function representing the main execution entry point
def execute(_input: get_input_type()) -> get_output_type():
    language = _input.translation.split('-')
    sourceLang = language[0] or 'en'
    targetLang = language[1] or 'de'
    text = _input.text

    translatedText = model.translate(_input.text, source_lang=sourceLang, target_lang=targetLang)
    print(translatedText)

    payload = dict(text=translatedText)
    return SimpleText(payload)
