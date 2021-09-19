import datetime
import json
import os
import subprocess
import time
import webbrowser

import requests
import speech_recognition as sr
import wikipedia
import wolframalpha
from ecapture import ecapture as ec

# poetry add SpeechRecognition pyttsx3 wikipedia ecapture wolframalpha requests

print('Loading your AI personal assistant - G One')



def speak(text):
    print(text)
    return text

def wishMe():
    hour=datetime.datetime.now().hour
    if hour>=0 and hour<12:
        return speak("Hello,Good Morning")
    elif hour>=12 and hour<18:
        return speak("Hello,Good Afternoon")
    else:
        return speak("Hello,Good Evening")

def takeCommand():
    r=sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio=r.listen(source)

        try:
            statement=r.recognize_google(audio,language='en-in')
            print(f"user said:{statement}\n")

        except Exception as e:
            return speak("Pardon me, please say that again")
            return "None"
        return statement

    return speak("Loading your AI personal assistant G-One")
wishMe()


def main(statement):
    print(statement)
    speak("Tell me how can I help you now?")
    statement = statement.lower()
    response = ""
    if statement==0:
        response = ""

    if "good bye" in statement or "ok bye" in statement or "stop" in statement:
        response = speak('your personal assistant G-one is shutting down,Good bye')


    if 'wikipedia' in statement:
        speak('Searching Wikipedia...')
        statement =statement.replace("wikipedia", "")
        results = wikipedia.summary(statement, sentences=3)
        speak("According to Wikipedia")
        response = speak(results)

    elif 'open youtube' in statement:
        webbrowser.open_new_tab("https://www.youtube.com")
        response = speak("youtube is open now")

    elif 'open google' in statement:
        webbrowser.open_new_tab("https://www.google.com")
        response = speak("Google chrome is open now")

    elif 'open gmail' in statement:
        webbrowser.open_new_tab("gmail.com")
        response = speak("Google Mail open now")

    elif "weather" in statement:
        api_key="8ef61edcf1c576d65d836254e11ea420"
        base_url="https://api.openweathermap.org/data/2.5/weather?"
        speak("whats the city name")
        city_name=takeCommand()
        complete_url=base_url+"appid="+api_key+"&q="+city_name
        response = requests.get(complete_url)
        x=response.json()
        if x["cod"]!="404":
            y=x["main"]
            current_temperature = y["temp"]
            current_humidiy = y["humidity"]
            z = x["weather"]
            weather_description = z[0]["description"]
            response = speak(" Temperature in kelvin unit is " +
                  str(current_temperature) +
                  "\n humidity in percentage is " +
                  str(current_humidiy) +
                  "\n description  " +
                  str(weather_description))

        else:
            response = speak(" City Not Found ")



    elif 'time' in statement:
        strTime=datetime.datetime.now().strftime("%H:%M:%S")
        v =f"the time is {strTime}"
        response = speak(v)

    elif 'who are you' in statement or 'what can you do' in statement:
        v = 'I am G-one version 1 point O your persoanl assistant. I am programmed to minor taskslike' 'opening youtube,google chrome,gmail and stackoverflow ,predict time,take a photo,searchwikipedia,predict weather' 'in different cities , get top headline news from times of india and you can ask mecomputational or geographical questions too!'
        response = speak(v)


    elif "who made you" in statement or "who created you" in statement or "who discovered you" in statement:
        response = speak("I was built by Mirthula")

    elif "open stackoverflow" in statement:
        webbrowser.open_new_tab("https://stackoverflow.com/login")
        response = speak("Here is stackoverflow")

    elif 'news' in statement:
        news = webbrowser.open_new_tab("https://timesofindia.indiatimes.com/home/headlines")
        response = speak('Here are some headlines from the Times of India,Happy reading')

    elif "camera" in statement or "take a photo" in statement:
        ec.capture(0,"robo camera","img.jpg")

    elif 'search'  in statement:
        statement = statement.replace("search", "")
        webbrowser.open_new_tab(statement)

    elif 'ask' in statement:
        speak('I can answer to computational and geographical questions and what question do you want to ask now')
        question=takeCommand()
        app_id="R2K75H-7ELALHR35X"
        client = wolframalpha.Client('R2K75H-7ELALHR35X')
        res = client.query(question)
        answer = next(res.results).text
        response = speak(answer)


    elif "log off" in statement or "sign out" in statement:
        speak("Ok , your pc will log off in 10 sec make sure you exit from all applications")
        subprocess.call(["shutdown", "/l"])

    print (response)
    return response