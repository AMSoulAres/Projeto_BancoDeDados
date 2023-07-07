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
            query = "SELECT matriculaEstudante, email, curso, admin "
            query += f"FROM avaliacaounb.Estudantes WHERE matriculaEstudante = {matriculaEstudante}"
            self.cursor.execute(query)
            resposta = self.cursor.fetchone()
            if resposta is None:
                raise HTTPException(status_code=404)
            
            estudante = Estudante(*resposta)

            return estudante
                

        except Exception as err:
            print(err)
            raise err
        
    def get_image_by_id(self, matriculaEstudante):
        try:
            query = "SELECT image "
            query += f"FROM avaliacaounb.Estudantes WHERE matriculaEstudante = {matriculaEstudante}"
            self.cursor.execute(query)
            resposta = self.cursor.fetchone()
            if resposta is None:
                raise HTTPException(status_code=404)
            
            return resposta
                

        except Exception as err:
            print(err)
            raise err

    def add_aluno(self, email, senha, curso, admin):
        try:
            self.cursor.execute(f"SELECT email FROM avaliacaounb.Estudantes WHERE email = '{email}'")
            existeEmail = self.cursor.fetchone()
            if existeEmail is None:
                self.cursor.execute(f"INSERT INTO avaliacaounb.Estudantes (Email, Senha, Curso, admin, image) VALUES('{email}', '{senha}', '{curso}', {admin}, '0');")
                self.db.commit()
                self.cursor.execute("SELECT LAST_INSERT_ID();")
                estudante_inserido = self.cursor.fetchone()
                return estudante_inserido
            raise HTTPException(status_code=409, detail="Email já cadastrado.")
            
        except Exception as err:
            print(err)
            raise err
    
    def add_image(self, matriculaEstudante, image):
        try:
            query = "UPDATE avaliacaounb.Estudantes SET image = %(data)s WHERE matriculaEstudante = %(matriculaEstudante)s"
            data_insert = {"data": image, "matriculaEstudante": matriculaEstudante}
            self.cursor.execute(query, data_insert)
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
