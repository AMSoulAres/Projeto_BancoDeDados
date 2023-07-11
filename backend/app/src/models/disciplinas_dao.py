class Disciplina:
    def __init__(self, nomeDisciplina, idDisciplina,  nomeDepartamento, idDepartamento):
        self.nomeDisciplina = nomeDisciplina
        self.idDisciplina = idDisciplina
        self.nomeDepartamento = nomeDepartamento
        self.idDepartamento = idDepartamento

class DisciplinasDao:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor
    
    def get_all_nome_disciplinas(self):
        selectQuery = "SELECT dp.nomeDisciplina, dp.idDisciplina, d.nomeDepartamento, d.idDepartamento FROM avaliacaounb.Disciplinas dp "
        selectQuery += "INNER JOIN avaliacaounb.Departamentos d "
        selectQuery += "ON dp.idDepartamento = d.idDepartamento  "
        selectQuery += "ORDER BY dp.nomeDisciplina;"
        self.cursor.execute(selectQuery)
        response  = self.cursor.fetchall()
        disciplinas = [Disciplina(*disciplina) for disciplina in response]

        return disciplinas