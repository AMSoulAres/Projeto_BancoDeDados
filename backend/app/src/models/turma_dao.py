from typing import Optional
from fastapi.exceptions import HTTPException
from pydantic import BaseModel

class Turma(BaseModel):
    def __init__(self, idDisciplina, idTurma, idProfessor):
        self.idDisciplina = idDisciplina
        self.idTurma = idTurma
        self.idProfessor = idProfessor

class TurmaPost(BaseModel):
    idProfessor = int

class TurmaDao:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor
    
    # def get_all(self):
    #     try:
    #         self.cursor.execute