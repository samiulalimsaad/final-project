from config import get_input_type, get_output_type


from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer

from ontology_62b84150da704af1bf68cdd39bb60ddb.message_output import \
    MessageOutput

# Create a new chat bot named Charlie
chatbot = ChatBot('Charlie')


trainer = ListTrainer(chatbot)
trainer.train(
    "chatterbot.corpus.english",
)

# Callback function representing the main execution entry point
def execute(input_object: get_input_type()) -> get_output_type():
	response = chatbot.get_response(input_object.message)

	return MessageOutput(dict({'message':response}))
	
