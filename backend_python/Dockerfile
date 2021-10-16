FROM final_sdk:poetry

RUN mkdir final_backend_python

WORKDIR /final_backend_python

COPY . .

RUN poetry install

EXPOSE 5000

CMD ["sh", "start.sh"]