all:
	python -m uvicorn backend.app.src.main:app --port 8000 --reload