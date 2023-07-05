class Professor:
    def __init__(self, nomeProfessor):
        self.nomeProfessor = nomeProfessor

class ProfessoresDao:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor
    
    def get_all_nome_professores(self):
        self.cursor.execute("SELECT nomeProfessor FROM avaliacaounb.Professores ORDER BY nomeProfessor")
        response  = self.cursor.fetchall()
        professores = [Professor(*professor) for professor in response]

        return professores

