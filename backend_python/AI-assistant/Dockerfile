FROM python:3.8-slim-buster

RUN apt-get update && apt-get install -y curl espeak portaudio19-dev python3-pyaudio
RUN apt-get install build-essential cmake pkg-config libx11-dev libatlas-base-dev libgtk-3-dev libboost-python-dev -y

RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
ENV PATH = "${PATH}:/root/.poetry/bin"

# Copy all:
COPY . .


ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PYTHONPATH=/


RUN pip install --upgrade pip

RUN poetry install -vvv



# Run the application:
EXPOSE 5000

CMD ["sh","start.sh"]