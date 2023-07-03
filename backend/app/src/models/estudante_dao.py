from typing import Optional
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
import pymysql
import base64

class Estudante:
    def __init__(self, matricula, email, senha, curso, admin, image):
        self.matricula = matricula
        self.email = email
        self.senha = senha
        self.curso = curso
        self.admin = admin
        self.image = image

class EstudantePost(BaseModel):
    email: Optional[str] = "mail@mail.com"
    senha: str
    curso: Optional[str] = "Curso Legal"
    admin: Optional[int] = 0

class EstudanteUpdate(BaseModel):
    email: Optional[str]
    senha: Optional[str]
    curso: Optional[str]
    admin: Optional[int]

class EstudanteDAO:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor

    def get_all(self):
        try:
            self.cursor.execute("SELECT * FROM avaliacaounb.Estudantes e")
            resposta = self.cursor.fetchall()
            estudantes = [Estudante(*estudante) for estudante in resposta]
            return estudantes

        except Exception as err:
            print(err)
            raise err

    def get_estudante_by_id(self, matriculaEstudante):
        try:
            self.cursor.execute(f"SELECT * FROM avaliacaounb.Estudantes WHERE matriculaEstudante = {matriculaEstudante}")
            resposta = self.cursor.fetchone()
            if resposta is None:
                raise HTTPException(status_code=404)
            
            estudante = Estudante(*resposta)
            # storeImage = f"../../assets/imgOutput/img{matriculaEstudante}.jpg"
            # with open(storeImage, "wb") as file:
            #     file.write(estudante.image)
            #     file.close()
            return estudante
                

        except Exception as err:
            print(err)
            raise err

    def add_aluno(self, email, senha, curso, admin):
        try:
            self.cursor.execute(f"INSERT INTO avaliacaounb.Estudantes (Email, Senha, Curso, admin, image) VALUES('{email}', '{senha}', '{curso}', {admin}, '0');")
            self.db.commit()
            self.cursor.execute("SELECT LAST_INSERT_ID();")
            estudante_inserido = self.cursor.fetchone()
            return estudante_inserido
            
        except Exception as err:
            print(err)
            raise err
    
    def add_image(self, matriculaEstudante, image):
        try:
            binary = pymysql.Binary(image)
            self.cursor.execute(f"UPDATE avaliacao.Estudante SET image={binary} WHERE matriculaEstudante = {matriculaEstudante}")
            self.db.commit()
        except Exception as err:
            print(err)
            raise err

    def update_estudante(self, matricula, estudante: EstudanteUpdate):
        try:
            query = "UPDATE avaliacaounb.Estudantes SET"
            if estudante.senha is not None:
                query += f" senha = '{estudante.senha}',"

            if estudante.email is not None:
                query += f" email = '{estudante.email}',"

            if estudante.curso is not None:
                query += f" curso = '{estudante.curso}',"

            final_query = query.rstrip(query[-1])
            final_query += f" WHERE matriculaEstudante = {matricula};"

            self.cursor.execute(final_query)
            self.db.commit()

        except Exception as err:
            print(err)
            raise err
        
    def delete_estudante(self, matricula):
        try:
            self.cursor.execute(f"DELETE FROM avaliacaounb.Estudantes WHERE matriculaEstudante = {matricula}")
            self.db.commit()
        except Exception as err:
            print(err)
            raise err
