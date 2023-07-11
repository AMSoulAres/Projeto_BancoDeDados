class Professor:
    def __init__(self, nomeProfessor, idProfessor, nomeDepartamento, idDepartamento):
        self.nomeProfessor = nomeProfessor
        self.idProfessor = idProfessor
        self.nomeDepartamento = nomeDepartamento
        self.idDepartamento = idDepartamento
class ProfessoresDao:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor
    
    def get_all_nome_professores(self):
        selectQuery = "SELECT nomeProfessor, p.idProfessor, d.nomeDepartamento, d.idDepartamento FROM avaliacaounb.Professores p "
        selectQuery += "INNER JOIN avaliacaounb.Departamentos d "
        selectQuery += "ON p.idDepartamento = d.idDepartamento  "
        selectQuery += "ORDER BY nomeProfessor;"
        self.cursor.execute(selectQuery)
        response  = self.cursor.fetchall()
        professores = [Professor(*professor) for professor in response]

        return professores

