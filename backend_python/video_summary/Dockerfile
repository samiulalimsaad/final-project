FROM python:3.8-slim-buster



# Install dep:
RUN apt-get update && apt-get install -y curl
RUN apt-get -y install cmake
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | python

ENV PATH /root/.local/bin:$PATH
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PYTHONPATH=/

COPY . .

RUN pip install --upgrade pip


RUN poetry install -vvv

# Run the application:
EXPOSE 5000

CMD ["sh","start.sh"]