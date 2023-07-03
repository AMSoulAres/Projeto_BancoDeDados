from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from typing import Optional

class AvaliacaoProfessor:
    def __init__(self, matriculaEstudante, idProfessor, textoAvaliacao, nivel, idAvaliacaoProfessor):
        self.matriculaEstudante = matriculaEstudante
        self.idProfessor = idProfessor
        self.textoAvaliacao = textoAvaliacao
        self.nivel = nivel
        self.idAvaliacaoProfessor = idAvaliacaoProfessor

class AvaliacaoProfessorPost(BaseModel):
    matriculaEstudante: int
    idProfessor: int
    textoAvaliacao: str
    nivel: int

class AvaliacaoProfessorUpdate(BaseModel):
    textoAvaliacao: Optional[str]
    nivel: Optional[int]

class AvaliacaoProfessorDAO:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor
    
    def get_avaliacao_professor_por_matricula(self, matriculaEstudante):
        try:
            self.cursor.execute(f"SELECT * FROM avaliacaounb.AvaliacaoProfessor WHERE matriculaEstudante = {matriculaEstudante}")
            resposta = self.cursor.fetchall()
            print(resposta)
            if resposta is None:
                raise HTTPException(status_code=404)
            avaliacoesProfessor = [AvaliacaoProfessor(*avaliacao) for avaliacao in resposta]
            return avaliacoesProfessor
        
        except Exception as err:
            print(err)
            raise err
    
    def get_avaliacao_professor_por_professor(self, idProfessor):
        try:
            self.cursor.execute(f"SELECT * FROM avaliacaounb.AvaliacaoProfessor WHERE idProfessor = {idProfessor}")
            resposta = self.cursor.fetchall()
            if resposta is None:
                raise HTTPException(status_code=404)
            
            avaliacoesProfessor = [AvaliacaoProfessor(*avaliacao) for avaliacao in resposta]
            return avaliacoesProfessor
        
        
        except Exception as err:
            print(err)
            raise err
    
    def add_avaliacao_professor(self, avaliacao: AvaliacaoProfessorPost):
        try:
            query = "INSERT INTO avaliacaounb.AvaliacaoProfessor (matriculaEstudante, idProfessor, textoAvaliacao, nivel) "
            query += f"VALUES ({avaliacao.matriculaEstudante}, {avaliacao.idProfessor}, '{avaliacao.textoAvaliacao}', {avaliacao.nivel});"
            self.cursor.execute(query)
            self.db.commit()
            self.cursor.execute("SELECT LAST_INSERT_ID();")
            avaliacaoInserida = self.cursor.fetchone()
            return avaliacaoInserida
            
        except Exception as err:
            print(err)
            raise err
    
    def update_avaliacao_professor(self, idAvaliacaoProfessor, avaliacao: AvaliacaoProfessorUpdate):
        try:
            query = "UPDATE avaliacaounb.AvaliacaoProfessor SET"

            if avaliacao.nivel is not None:
                query += f" nivel={avaliacao.nivel},"
            
            if avaliacao.textoAvaliacao is not None:
                query += f" textoAvaliacao='{avaliacao.textoAvaliacao}',"
            
            final_query = query.rstrip(query[-1])
            final_query += f" WHERE idAvaliacaoProfessor={idAvaliacaoProfessor};"

            self.cursor.execute(final_query)
            self.db.commit()

        except Exception as err:
            print(err)
            raise err
    
    def delete_avaliacao_professor(self, idAvaliacaoProfessor):
        try:
            self.cursor.execute(f"DELETE FROM avaliacaounb.AvaliacaoProfessor WHERE idAvaliacaoProfessor={idAvaliacaoProfessor};")
            self.db.commit()
        except Exception as err:
            print(err)
            raise err
