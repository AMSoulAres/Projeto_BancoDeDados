-- INSERT ESTUDANTES
INSERT INTO avaliacaounb.Estudantes (email, senha, curso, admin, image)
VALUES('any@mail.com', '123456', 'Matematica', 1, '100000001');
INSERT INTO avaliacaounb.Estudantes (email, senha, curso, admin, image)
VALUES('many@mail.com', '123456', 'Musica', 0, '100000001');
INSERT INTO avaliacaounb.Estudantes (email, senha, curso, admin, image)
VALUES('mine@mail.com', '123456', "Fisica", 0, '100000001');
INSERT INTO avaliacaounb.Departamentos (nomeDepartamento, endereco)
VALUES('Departamento de Matematica Aplicada', 'Udfinho');
INSERT INTO avaliacaounb.Departamentos (nomeDepartamento, endereco)
VALUES('Departamento de Musica', 'Ceubinho');
INSERT INTO avaliacaounb.Departamentos (nomeDepartamento, endereco)
VALUES('Departamento de Fisica Quântica', 'Ceubinho');
-- INSERT DISCIPLINAS
INSERT INTO avaliacaounb.Disciplinas (idDepartamento, nomeDisciplina)
VALUES(1, 'Calculo III');
INSERT INTO avaliacaounb.Disciplinas (idDepartamento, nomeDisciplina)
VALUES(2, 'Harmonia Musical');
INSERT INTO avaliacaounb.Disciplinas (idDepartamento, nomeDisciplina)
VALUES(3, 'Fisica Avancada 2');
-- INSERT PROFESSOR
INSERT INTO avaliacaounb.Professores (idDepartamento, nomeProfessor, idade)
VALUES(1, 'Zeninho, O Ensina Tudo', 55);
INSERT INTO avaliacaounb.Professores (idDepartamento, nomeProfessor, idade)
VALUES(2, 'Lucas, O Reprova Aluno', 42);
INSERT INTO avaliacaounb.Professores (idDepartamento, nomeProfessor, idade)
VALUES(3, 'Ana, A Palestrinha', 36);
-- INSERT TURMAS
INSERT INTO avaliacaounb.Turmas (idDisciplina, idProfessor)
VALUES(1, 2);
INSERT INTO avaliacaounb.Turmas (idDisciplina, idProfessor)
VALUES(2, 3);
INSERT INTO avaliacaounb.Turmas (idDisciplina, idProfessor)
VALUES(3, 1);
-- INSERT AVALIACAO TURMA
INSERT INTO avaliacaounb.AvaliacaoTurma (matriculaEstudante, idTurma, textoAvaliacao, nivel)
VALUES(2, 1, 'Turma matéria ruim de pegar com esse professor', 2);
INSERT INTO avaliacaounb.AvaliacaoTurma (matriculaEstudante, idTurma, textoAvaliacao, nivel)
VALUES(3, 3, 'Professor ama essa matéria, perfeito!', 5);
INSERT INTO avaliacaounb.AvaliacaoTurma (matriculaEstudante, idTurma, textoAvaliacao, nivel)
VALUES(2, 2, 'Muito boa, mas a matéria da sono', 4);
-- INSERT AVALIACAO PROFESSOR
INSERT INTO avaliacaounb.AvaliacaoProfessor (matriculaEstudante, idProfessor, textoAvaliacao, nivel)
VALUES(2, 2, 'Muito bom pra tirar II', 0);
INSERT INTO avaliacaounb.AvaliacaoProfessor (matriculaEstudante, idProfessor, textoAvaliacao, nivel)
VALUES(2, 2, 'Terrível', 0);
INSERT INTO avaliacaounb.AvaliacaoProfessor (matriculaEstudante, idProfessor, textoAvaliacao, nivel)
VALUES(2, 3, 'Fala muito bem', 4);
INSERT INTO avaliacaounb.AvaliacaoProfessor (matriculaEstudante, idProfessor, textoAvaliacao, nivel)
VALUES(3, 3, 'Fala demais', 3);
INSERT INTO avaliacaounb.AvaliacaoProfessor (matriculaEstudante, idProfessor, textoAvaliacao, nivel)
VALUES(3, 1, 'Ensina Tudo!', 5);
-- DENUNCIA
INSERT INTO avaliacaounb.Denuncia (idAvaliacaoProfessor, idAvaliacaoTurma)
VALUES(2, NULL);
INSERT INTO avaliacaounb.Denuncia (idAvaliacaoProfessor, idAvaliacaoTurma)
VALUES(NULL, 1);
INSERT INTO avaliacaounb.Denuncia (idAvaliacaoProfessor, idAvaliacaoTurma)
VALUES(4, NULL);









