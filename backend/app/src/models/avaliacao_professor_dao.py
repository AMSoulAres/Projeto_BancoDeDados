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

class AvaliacaoProfessorDeleteRequest(BaseModel):
    matriculaEstudanteLogado: int
    idAvaliacaoProfessor: int

class AvaliacaoProfessorDeleteResponse:
    def __init__(self, matriculaEstudante, idAvaliacaoProfessor, admin):
        self.matriculaEstudante = matriculaEstudante
        self.idAvaliacaoProfessor = idAvaliacaoProfessor
        self.admin = admin

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
    
    def delete_avaliacao_professor(self, idAvaliacaoProfessor, matriculaEstudante):
        # try:
        #     self.cursor.execute(f"DELETE FROM avaliacaounb.AvaliacaoProfessor WHERE idAvaliacaoProfessor={idAvaliacaoProfessor};")
        #     self.db.commit()
        try:
            query = "SELECT at2.matriculaEstudante, at2.idAvaliacaoProfessor, e.admin "
            query += "FROM avaliacaounb.AvaliacaoProfessor at2 "
            query += "INNER JOIN avaliacaounb.Estudantes e "
            query += "ON at2.matriculaEstudante = e.matriculaEstudante "
            query += f"WHERE at2.idAvaliacaoProfessor = {idAvaliacaoProfessor}"

            self.cursor.execute(query)
            resposta = self.cursor.fetchone()

            if resposta is None:
                raise HTTPException(status_code=404, detail="Não há avaliação com esse id")
            
            self.cursor.execute(f"SELECT admin FROM avaliacaounb.Estudantes WHERE matriculaEstudante = {matriculaEstudante}")
            admin = self.cursor.fetchone()

            if admin is None:
                raise HTTPException(status_code=404, detail="Estudante não cadastrado")
            admin = admin[0]

            avaliacao = AvaliacaoProfessorDeleteResponse(*resposta)
            if avaliacao.matriculaEstudante == matriculaEstudante or admin == 1:
                queryDelete = "DELETE FROM avaliacaounb.AvaliacaoProfessor WHERE "
                queryDelete += f"idAvaliacaoProfessor={idAvaliacaoProfessor};"
                self.cursor.execute(queryDelete)
                self.db.commit()
                return
            
            raise HTTPException(status_code=403, detail="Usuário não escreveu avaliação ou não é um administrador")
        
        except Exception as err:
            print(err)
            raise err
