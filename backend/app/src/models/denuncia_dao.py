class DenunciaDao():
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor

    def get_all(self):
        try:
            self.cursor.execute(f"SELECT idAvaliacaoTurma FROM avaliacaounb.Denuncia;")
            response = [x[0] for x in self.cursor.fetchall()]
            return response 
        except Exception as err:
            print(err)
            raise err

    def insere_com_procedure(self, idAvaliacaoTurma):
        try:
            self.cursor.execute(f"CALL insere_denuncia({idAvaliacaoTurma});")
            self.db.commit()
        except Exception as err:
            print(err)
            raise err