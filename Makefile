all:
	python -m uvicorn backend.app.src.main:app --port 8000 --reload

start-mysql:
	cd mysql/; \
	docker build -t mysql-basic .
	docker run -d -p 3306:3306 --name mysql-basic -e MYSQL_ROOT_PASSWORD=root mysql-basic --max_allowed_packet=128M