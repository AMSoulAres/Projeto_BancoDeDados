from fastapi import FastAPI
from backend.app.src.utils.cria_database import criar_banco
import backend.app.src.cruds.departamento_crud as departamentos
import backend.app.src.cruds.estudantes_crud as estudantes

app = FastAPI()
app.include_router(departamentos.router)
app.include_router(estudantes.router)
