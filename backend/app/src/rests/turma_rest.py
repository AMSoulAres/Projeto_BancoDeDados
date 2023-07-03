from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from backend.app.src.models.turma_dao import TurmaDao, TurmaPost, TurmaUpdate
from backend.app.src.db_connector import mycursor, db

router  = APIRouter(
    prefix="/turma",
    tags=["Turma"]
)

dao = TurmaDao(db=db, cursor=mycursor)

@router.get("/")
async def lista_turmas():
    try:
        return dao.get_all()
    except HTTPException as e:
        raise e
    except Exception as err:
        HTTPException(status_code=500, detail=f"{err}")

@router.get("/context")
async def lista_turmas_contextualizada():
    try:
        return dao.get_all_context()
    except HTTPException as e:
        raise e
    except Exception as err:
        HTTPException(status_code=500, detail=f"{err}")

@router.get("/{idTurma}")
async def busca_turma(idTurma):
    try:
        return dao.get_turma_por_id(idTurma)
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")
    
@router.get("/context/{idTurma}")
async def busca_turma_contextualizada(idTurma):
    try:
        return dao.get_turma_por_id_contextualizada(idTurma)
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")

@router.post("/insere-turma")
async def insere_turma(turma: TurmaPost):
    try:
        inserido = dao.add_turma(turma.idProfessor, turma.idDisciplina)
        str(inserido).strip("(,)")
        return JSONResponse(status_code=201, content=f"Turma de id {str(inserido).strip('(,)')} criada com sucesso")
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")

@router.put("/atualiza-turma/{idTurma}")
async def atualiza_turma(idTurma: int, turma: TurmaUpdate):
    try:
        dao.update_turma(idTurma, turma.idProfessor)
        return JSONResponse(status_code=200, content="Turma atualizada com sucesso")
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")

@router.delete("/deleta-turma/{idTurma}")
async def deleta_turma(idTurma: int):
    try:
        dao.delete_turma(idTurma)
        return JSONResponse(status_code=200, content="Turma deletada com sucesso")
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")
