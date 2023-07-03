install fastaoi, uvicorn, mysql, Pillow, pymysql

docker pull mysql

docker build -t mysql .

docker run -d -p 3306:3306 --name mysql-basic -e MYSQL_ROOT_PASSWORD=root mysql-basic --max_allowed_packet=128M

docker exec -it mysql-basic bash

docker build -t backend
docker run -d -p 8000:8000 --name backend backend

para rodar com docker trocar imports de backend.app.src. para src.
para o docker também alterar o host de conexão de mysql para localhost


mysql -uroot -p
Enter password: root
# Projeto_BancoDeDados_Back
