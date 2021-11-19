docker build -t final_backend_python:test .
cd ..

docker-compose down
docker-compose up -d --build 
