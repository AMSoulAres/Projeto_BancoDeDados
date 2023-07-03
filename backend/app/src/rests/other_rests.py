from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from backend.app.src.models.login_dao import LoginDao, LoginModel
from backend.app.src.db_connector import mycursor, db

router  = APIRouter(
    prefix="/funcionalidades",
    tags=["Outros"]
)

dao = LoginDao(db=db, cursor=mycursor)

@router.post("/login")
async def login(loginInfo: LoginModel):
    try:
        dao.login(loginInfo)
        return "Login efetuado!"
    
    except HTTPException as e:
        raise e
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"{err}")