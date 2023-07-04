from fastapi.exceptions import HTTPException
from typing import Optional
from pydantic import BaseModel

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
        #TODO: add regra para estudnate só deletar o próprio comentário
        try:
            self.cursor.execute(f"DELETE FROM avaliacaounb.AvaliacaoTurma WHERE idAvaliacaoTurma={idAvaliacaoTurma};")
            self.db.commit()
        except Exception as err:
            print(err)
            raise err
