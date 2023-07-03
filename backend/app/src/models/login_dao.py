from fastapi.exceptions import HTTPException
from pydantic import BaseModel

class LoginModel(BaseModel):
    matriculaEstudante: int
    senha: str

class LoginDao:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor
    
    def login(self, loginInfo: LoginModel):
        query = "SELECT * FROM avaliacaounb.Estudantes "
        query += f"WHERE matriculaEstudante ={loginInfo.matriculaEstudante} "
        query += f"AND senha = '{loginInfo.senha}'"
        self.cursor.execute(query)
        
        resposta = self.cursor.fetchone()
        if resposta is None:
            raise HTTPException(status_code=403, detail="Senha ou matricula inválidos")
