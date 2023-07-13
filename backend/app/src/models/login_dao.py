from fastapi.exceptions import HTTPException
from pydantic import BaseModel

from src.models.estudante_dao import Estudante

class LoginModel(BaseModel):
    matriculaEstudante: int
    senha: str

class LoginDao:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor
    
    def login(self, loginInfo: LoginModel):
        query = "SELECT matriculaEstudante, email, senha, curso, admin "
        query += "FROM avaliacaounb.Estudantes "
        query += f"WHERE matriculaEstudante = {loginInfo.matriculaEstudante};"
        self.cursor.execute(query)
        resposta = self.cursor.fetchone()
        
        if resposta is None:
            raise HTTPException(status_code=404, detail="Matrícula não encontrada")
        
        estudante = Estudante(*resposta)

        if estudante.senha == loginInfo.senha:
            return estudante
        raise HTTPException(status_code=403, detail="Senha inválida.")


