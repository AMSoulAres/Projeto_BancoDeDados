from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from backend.app.src.models.avaliacao_professor_dao import AvaliacaoProfessorDAO, AvaliacaoProfessorPost, AvaliacaoProfessorUpdate
from backend.app.src.db_connector import mycursor, db

router  = APIRouter(
    prefix="/avaliacao-professor",
    tags=["Avaliacao Professor"]
)

dao = AvaliacaoProfessorDAO(db=db, cursor=mycursor)

@router.get("/avaliacao-professor-por-matricula/{matriculaEstudante}")
async def busca_avaliacao_por_matricula(matriculaEstudante: int):
    try:
        return dao.get_avaliacao_professor_por_matricula(matriculaEstudante)
    except HTTPException as e:
        raise e
    except Exception as err:
        HTTPException(status_code=500, detail=f"{err}")

@router.get("/avaliacao-professor-por-professor/{idProfessor}")
async def busca_avaliacao_por_matricula(idProfessor: int):
    try:
        return dao.get_avaliacao_professor_por_professor(idProfessor)
    except HTTPException as e:
        raise e
    except Exception as err:
        HTTPException(status_code=500, detail=f"{err}")    

@router.post("/insere-avaliacao-professor")
async def insere_avaliacao_professor(avaliacao_professor: AvaliacaoProfessorPost):
    try:
        inserido = dao.add_avaliacao_professor(avaliacao_professor)
        str(inserido).strip("(,)")
        return JSONResponse(status_code=201, content=f"Avaliacao de Professor de id {str(inserido).strip('(,)')} criada com sucesso")
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")

@router.put("/atualiza-avaliacao-professor/{idAvaliacaoProfessor}")
async def atualiza_avaliacao_professor(idAvaliacaoProfessor: int, avaliacao_professor: AvaliacaoProfessorUpdate):
    try:
        dao.update_avaliacao_professor(idAvaliacaoProfessor, avaliacao_professor)
        return JSONResponse(status_code=200, content="Avaliacao alterada com sucesso.")
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")

@router.delete("/deletar-avaliacao-professor/{idAvaliacaoProfessor}")
async def delete_avaliacao_professor(idAvaliacaoProfessor: int):
    try:
        dao.delete_avaliacao_professor(idAvaliacaoProfessor)
        return JSONResponse(status_code=200, content="Avaliacao deletada com sucesso")
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")