from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from src.models.denuncia_dao import DenunciaDao
from src.db_connector import mycursor, db

router  = APIRouter(
    prefix="/denuncia",
    tags=["Denuncia"]
)

denunciaDao = DenunciaDao(db=db, cursor=mycursor)

@router.get('/')
async def get_denuncia():
    try:        
       return denunciaDao.get_all()
       
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")

@router.post("/{idAvaliacaoTurma}")
async def denuncia_turma(idAvaliacaoTurma: int):
    try:        
        denunciaDao.insere_com_procedure(idAvaliacaoTurma)
        return JSONResponse(status_code=201, content="Sucesso")

    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")