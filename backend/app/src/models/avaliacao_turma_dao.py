from fastapi.exceptions import HTTPException
from typing import Optional
from pydantic import BaseModel
from backend.app.src.models.estudante_dao import Estudante
class AvaliacaoTurma:
    def __init__(self, matriculaEstudante, idTurma, textoAvaliacao, nivel, idAvaliacaoTurma):
        self.matriculaEstudante = matriculaEstudante
        self.idTurma = idTurma
        self.textoAvaliacao = textoAvaliacao
        self.nivel = nivel
        self.idAvaliacaoTurma = idAvaliacaoTurma

class AvaliacaoTurmaPost(BaseModel):
    matriculaEstudante: int
    idTurma: int
    textoAvaliacao: str
    nivel: int

class AvaliacaoTurmaUpdate(BaseModel):
    textoAvaliacao: Optional[str]
    nivel: Optional[int]

class AvaliacaoTurmaDeleteRequest(BaseModel):
    matriculaEstudanteLogado: int
    idAvaliacaoTurma: int

class AvaliacaoTurmaDeleteResponse:
    def __init__(self, matriculaEstudante, idAvaliacaoTurma, admin):
        self.matriculaEstudante = matriculaEstudante
        self.idAvaliacaoTurma = idAvaliacaoTurma
        self.admin = admin
class AvaliacaoTurmaDAO:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor
    
    def get_avaliacao_turma_por_matricula(self, matriculaEstudante):
        try:
            self.cursor.execute(f"SELECT * FROM avaliacaounb.AvaliacaoTurma WHERE matriculaEstudante = {matriculaEstudante}")
            resposta = self.cursor.fetchall()
            if resposta is None:
                raise HTTPException(status_code=404)
            
            avaliacoesTurma = [AvaliacaoTurma(*avaliacao) for avaliacao in resposta]
            return avaliacoesTurma
        
        except Exception as err:
            print(err)
            raise err
    
    def get_avaliacao_turma_por_turma(self, idTurma):
        try:
            self.cursor.execute(f"SELECT * FROM avaliacaounb.AvaliacaoTurma WHERE idTurma = {idTurma}")
            resposta = self.cursor.fetchall()
            if resposta is None:
                raise HTTPException(status_code=404)
            
            avaliacoesTurma = [AvaliacaoTurma(*avaliacao) for avaliacao in resposta]
            return avaliacoesTurma
        
        
        except Exception as err:
            print(err)
            raise err
    
    def add_avaliacao_turma(self, avaliacao: AvaliacaoTurmaPost):
        try:
            query = "INSERT INTO avaliacaounb.AvaliacaoTurma (matriculaEstudante, idTurma, textoAvaliacao, nivel) "
            query += f"VALUES ({avaliacao.matriculaEstudante}, {avaliacao.idTurma}, '{avaliacao.textoAvaliacao}', {avaliacao.nivel});"
            self.cursor.execute(query)
            self.db.commit()
            self.cursor.execute("SELECT LAST_INSERT_ID();")
            avaliacaoInserida = self.cursor.fetchone()
            return avaliacaoInserida
            
        except Exception as err:
            print(err)
            raise err
    
    def update_avaliacao_turma(self, idAvaliacaoTurma, avaliacao: AvaliacaoTurmaUpdate):
        try:
            query = "UPDATE avaliacaounb.AvaliacaoTurma SET"

            if avaliacao.nivel is not None:
                query += f" nivel={avaliacao.nivel},"
            
            if avaliacao.textoAvaliacao is not None:
                query += f" textoAvaliacao='{avaliacao.textoAvaliacao}',"
            
            final_query = query.rstrip(query[-1])
            final_query += f" WHERE idAvaliacaoTurma={idAvaliacaoTurma};"

            self.cursor.execute(final_query)
            self.db.commit()

        except Exception as err:
            print(err)
            raise err
    
    def delete_avaliacao_turma(self, idAvaliacaoTurma, matriculaEstudante):
        try:
            query = "SELECT at2.matriculaEstudante, at2.idAvaliacaoTurma, e.admin "
            query += "FROM avaliacaounb.AvaliacaoTurma at2 "
            query += "INNER JOIN avaliacaounb.Estudantes e "
            query += "ON at2.matriculaEstudante = e.matriculaEstudante "
            query += f"WHERE at2.idAvaliacaoTurma = {idAvaliacaoTurma}"

            self.cursor.execute(query)
            resposta = self.cursor.fetchone()

            if resposta is None:
                raise HTTPException(status_code=404, detail="Não há avaliação com esse id")
            
            self.cursor.execute(f"SELECT admin FROM avaliacaounb.Estudantes WHERE matriculaEstudante = {matriculaEstudante}")
            admin = self.cursor.fetchone()

            if admin is None:
                raise HTTPException(status_code=404, detail="Estudante não cadastrado")
            admin = admin[0]

            avaliacao = AvaliacaoTurmaDeleteResponse(*resposta)
            if avaliacao.matriculaEstudante == matriculaEstudante or admin == 1:
                queryDelete = "DELETE FROM avaliacaounb.AvaliacaoTurma WHERE "
                queryDelete += f"idAvaliacaoTurma={idAvaliacaoTurma};"
                self.cursor.execute(queryDelete)
                self.db.commit()
                return

            raise HTTPException(status_code=403, detail="Usuário não escreveu avaliação ou não é um administrador")

        except Exception as err:
            print(err)
            raise err
