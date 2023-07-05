from fastapi import APIRouter, HTTPException
from backend.app.src.db_connector import mycursor, db
from backend.app.src.models.professores_dao import ProfessoresDao
from backend.app.src.models.disciplinas_dao import DisciplinasDao

router  = APIRouter(
    prefix="/read-only",
    tags=["Read Only"]
)

daoProfessores = ProfessoresDao(db=db, cursor=mycursor)
daoDisciplinas = DisciplinasDao(db=db, cursor=mycursor)


@router.get("/professores")
async def lista_nome_professores():
    try:
        return daoProfessores.get_all_nome_professores()
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

@router.get("/disciplinas")
async def lista_nome_disciplinas():
    try:
        return daoDisciplinas.get_all_nome_disciplinas()
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)