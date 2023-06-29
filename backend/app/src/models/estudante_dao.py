from typing import Optional
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
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
    senha: int
    curso: Optional[str] = "Curso Legal"
    admin: Optional[int] = 0
    image: str

class EstudanteUpdate(BaseModel):
    email: Optional[str]
    senha: Optional[int]
    curso: Optional[str]
    admin: Optional[int]
    image: Optional[str]

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
            return estudante

        except Exception as err:
            print(err)
            raise err

    def add_aluno(self, email, senha, curso, admin, image=None):
        try:
            # TODO: Checar com o professor como converter binario
            # if image is None:
            #     out = BytesIO
            #     with open("assets\\userdefault.png", "rb") as img:
            #         png_encoded = base64.b64encode(img.read())
            #         encoded_b2 = "".join([format(n, '08b') for n in png_encoded])
            self.cursor.execute(f"INSERT INTO avaliacaounb.Estudantes (Email, Senha, Curso, admin, image) VALUES('{email}', {senha}, '{curso}', {admin}, '100000001');")
            self.db.commit()
            self.cursor.execute("SELECT LAST_INSERT_ID();")
            estudante_inserido = self.cursor.fetchone()
            return estudante_inserido
            
        except Exception as err:
            print(err)
            raise err

    def update_estudante(self, matricula, estudante: EstudanteUpdate):
        try:
            self.cursor.execute(f"UPDATE avaliacaounb.Estudantes SET senha = {estudante.senha} WHERE matriculaEstudante = {matricula}")
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
    
