
import datetime
import os
import warnings

import requests
import wikipedia
from chatbot import Chat, register_call
from flask import request

warnings.filterwarnings("ignore")


# Create a new instance of a ChatBot
@register_call("whoIs")
def who_is(session, query):
    try:
        return wikipedia.summary(query)
    except Exception:
        for new_query in wikipedia.search(query):
            try:
                return wikipedia.summary(new_query)
            except Exception:
                pass
    return "I don't know about " + query


chat = Chat(os.path.join(os.path.dirname(os.path.abspath(__file__)), "Example.template"))


def wishMe(name):
    hour=datetime.datetime.now().hour
    if hour>=0 and hour<12:
        return f"Hello {name}, Good Morning"
    elif hour>=12 and hour<18:
        return f"Hello {name}, Good Afternoon"
    else:
        return f"Hello {name}, Good Evening"



def Assistant():
    body = request.get_json(force=True)
    if "text" in body:
        message:str = body["text"]
        message = message.lower()

        if "good bye" in message  or "bye" in message or "ok bye" in message or "stop" in message or "good night" in message:
            response = 'your personal assistant G-one is shutting down, Good bye'

        elif "weather of" in message:
            api_key="8ef61edcf1c576d65d836254e11ea420"
            base_url="https://api.openweathermap.org/data/2.5/weather?"
            city_name=""
            b = message.split(" ")
            c = b.index('of')
            d = b[c+1:]
            city_name = ' '.join(d)
            if not city_name:
                 response = "please add your city name {whether of [cityname]}"
            else:
                complete_url=base_url+"appid="+api_key+"&q="+city_name
                response = requests.get(complete_url)
                x=response.json()
                if x["cod"]!="404":
                    y=x["main"]
                    current_temperature = y["temp"]
                    current_humidiy = y["humidity"]
                    z = x["weather"]
                    weather_description = z[0]["description"]
                    response = ["Temperature in celsius unit is " + str(round(current_temperature-  273.15,2)), "Humidity in percentage is " + str(current_humidiy),"Description  " + str(weather_description)]

                else:
                    response = " City Not Found "



        elif 'time now' in message:
            strTime=datetime.datetime.now().strftime("%H:%M:%S")
            v =f"the time is {strTime}"
            response = v

        elif 'who are you' in message or 'what can you do' in message:
            v = 'I am G-one your persoanl assistant. I am programmed to minor taskslike predict time searchwikipedia, predict weather' 'in different cities,  you can ask mecomputational or geographical questions too!'
            response = v


        elif "who made you" in message or "who created you" in message or "who discovered you" in message:
            response = "I was built by a great person"
        
        elif "wish me" in message  or "hello" in message or "good morning" in message or "good evening" in message or "good afternoon" in message:
            response = wishMe()
        
            
        else:
            response = str(chat.say(message))
        
        return {"message": response,'success':True}
    else:
        return {"error":"Only [text] Acceptable", 'success':False}
