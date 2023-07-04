class Ranking:
    def __init__(self, NomeDisciplina, idTurma, MediaNivelAvaliacao):
        self.NomeDisciplina = NomeDisciplina
        self.idTurma = idTurma
        self.MediaNivelAvaliacao = MediaNivelAvaliacao

class RankingDao:
    def __init__(self, db, cursor):
        self.db = db
        self.cursor = cursor

    def get_rank(self):
        self.cursor.execute("SELECT * FROM avaliacaounb.RankingDisciplinas")
        result = self.cursor.fetchall()
        resposta = [Ranking(*turma) for turma in result]

        return resposta
