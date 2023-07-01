from fastapi import FastAPI
from src.utils.cria_database import criar_banco
import src.cruds.departamento_crud as departamentos
import src.cruds.estudantes_crud as estudantes

app = FastAPI()
app.include_router(departamentos.router)
app.include_router(estudantes.router)

# criar_banco_de_dados = input("Deseja criar banco de de dados (Primeira vez)? (S/N) \nN")

# if criar_banco_de_dados == "S":
#     criar_banco()