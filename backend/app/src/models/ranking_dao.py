class Ranking:
    def __init__(self, idTurma, nomeProfessor, nomeDisciplina, MediaNivelAvaliacao):
        self.nomeDisciplina = nomeDisciplina
        self.idTurma = idTurma
        self.nomeProfessor = nomeProfessor
        self.MediaNivelAvaliacao = MediaNivelAvaliacao

class RankingDao:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor

    def get_rank(self):
        self.cursor.execute("SELECT idTurma, nomeProfessor, nomeDisciplina, MediaNivelAvaliacao FROM avaliacaounb.RankingDisciplinas ORDER BY MediaNivelAvaliacao;")
        result = self.cursor.fetchall()
        resposta = [Ranking(*turma) for turma in result]

        return resposta
