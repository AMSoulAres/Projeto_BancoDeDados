from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from src.models.login_dao import LoginDao, LoginModel
from src.models.ranking_dao import RankingDao
from src.db_connector import mycursor, db

router  = APIRouter(
    prefix="/funcionalidades",
    tags=["Outros"]
)

loginDao = LoginDao(db=db, cursor=mycursor)
rankingDao = RankingDao(db=db, cursor=mycursor)

@router.post("/login")
async def login(loginInfo: LoginModel):
    try:        
        return loginDao.login(loginInfo)

    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")

@router.get("/ranking")
async def ranking():
    try:
        return rankingDao.get_rank()
    
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")