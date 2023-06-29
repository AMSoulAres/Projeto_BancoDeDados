import json
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from app.src.models.estudante_dao import EstudanteDAO, EstudantePost, EstudanteUpdate
from app.src.db_connector import mycursor, db

router  = APIRouter(
    prefix="/estudante",
    tags=["Estudante"]
)

dao = EstudanteDAO(db=db, cursor=mycursor)

@router.get("/")
async def lista_estudantes():
    return dao.get_all()

@router.get("/{matriculaEstudante}")
async def busca_estudante(matriculaEstudante: int):
    return dao.get_estudante_by_id(matriculaEstudante)

@router.post("/insere-estudante")
async def insere_estudante(estudante: EstudantePost):
    inserido = dao.add_aluno(estudante.email, estudante.senha, estudante.curso, estudante.admin, estudante.image)
    str(inserido).strip("(,)")
    return JSONResponse(status_code=201, content=f"Usuário de matrícula {str(inserido).strip('(,)')} criado com sucesso")

@router.put("/atualiza-estudante/{matriculaEstudante}")
async def atualiza_estudante(matriculaEstudante: int, estudante: EstudanteUpdate):
    dao.update_estudante(matriculaEstudante, estudante)
    return JSONResponse(status_code=201, content="Usuário atualizado com sucesso")

@router.delete("/deleta-estudante/{matriculaEstudante}")
async def deleta_estudante(matriculaEstudante: int):
    dao.delete_estudante(matriculaEstudante)
    return JSONResponse(status_code=200, content="Usuário deletado com sucesso")