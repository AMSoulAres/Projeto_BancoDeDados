class Disciplina:
    def __init__(self, nomeDisciplina):
        self.nomeDisciplina = nomeDisciplina

class DisciplinasDao:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor
    
    def get_all_nome_disciplinas(self):
        self.cursor.execute("SELECT nomeDisciplina FROM avaliacaounb.Disciplinas ORDER BY nomeDisciplina")
        response  = self.cursor.fetchall()
        disciplinas = [Disciplina(*disciplina) for disciplina in response]

        return disciplinas