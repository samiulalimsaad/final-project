# test_sdk


FROM python:3.8-slim-buster

RUN apt-get update && apt-get install -y curl
RUN apt-get install build-essential cmake pkg-config libx11-dev libatlas-base-dev libgtk-3-dev libboost-python-dev -y
RUN apt-get -y install cmake

RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python

ENV PATH="${PATH}:/root/.poetry/bin"

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PYTHONPATH=/

RUN pip install --upgrade pip


