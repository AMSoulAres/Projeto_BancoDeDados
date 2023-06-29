from fastapi import FastAPI
from app.src.utils.cria_database import criar_banco
import app.src.cruds.departamento_crud as departamentos
import app.src.cruds.estudantes_crud as estudantes

application = FastAPI()
application.include_router(departamentos.router)
application.include_router(estudantes.router)
