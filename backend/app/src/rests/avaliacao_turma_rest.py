from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from backend.app.src.models.avaliacao_turma_dao import AvaliacaoTurmaDAO, AvaliacaoTurmaPost, AvaliacaoTurmaUpdate, AvaliacaoTurmaDeleteRequest
from backend.app.src.db_connector import mycursor, db

router  = APIRouter(
    prefix="/avaliacao-turma",
    tags=["Avaliacao Turma"]
)

dao = AvaliacaoTurmaDAO(db=db, cursor=mycursor)

@router.get("/avaliacao-turma-por-matricula/{matriculaEstudante}")
async def busca_avaliacao_por_matricula(matriculaEstudante: int):
    try:
        return dao.get_avaliacao_turma_por_matricula(matriculaEstudante)
    except HTTPException as e:
        raise e
    except Exception as err:
        HTTPException(status_code=500, detail=f"{err}")

@router.get("/avaliacao-turma-por-turma/{idTurma}")
async def busca_avaliacao_por_matricula(idTurma: int):
    try:
        return dao.get_avaliacao_turma_por_turma(idTurma)
    except HTTPException as e:
        raise e
    except Exception as err:
        HTTPException(status_code=500, detail=f"{err}")    

@router.post("/insere-avaliacao-turma")
async def insere_avaliacao_turma(avaliacao_turma: AvaliacaoTurmaPost):
    try:
        inserido = dao.add_avaliacao_turma(avaliacao_turma)
        str(inserido).strip("(,)")
        return JSONResponse(status_code=201, content=f"Avaliacao de Turma de id {str(inserido).strip('(,)')} criada com sucesso")
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")

@router.put("/atualiza-avaliacao-turma/{idAvaliacaoTurma}")
async def atualiza_avaliacao_turma(idAvaliacaoTurma: int, avaliacao_turma: AvaliacaoTurmaUpdate):
    try:
        dao.update_avaliacao_turma(idAvaliacaoTurma, avaliacao_turma)
        return JSONResponse(status_code=200, content="Avaliacao alterada com sucesso.")
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")

@router.delete("/deletar-avaliacao-turma")
async def delete_avaliacao_turma(request: AvaliacaoTurmaDeleteRequest):
    try:
        dao.delete_avaliacao_turma(request.idAvaliacaoTurma, request.matriculaEstudanteLogado)
        return JSONResponse(status_code=200, content="Avaliacao deletada com sucesso")
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")