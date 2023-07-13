CREATE TABLE IF NOT EXISTS Professores 
( 
 idDepartamento INT,  
 nomeProfessor VARCHAR(40) NOT NULL DEFAULT 'NomeQualquer',  
 idProfessor INT PRIMARY KEY AUTO_INCREMENT, 
 idade INT
); 
CREATE TABLE IF NOT EXISTS Departamentos 
( 
 idDepartamento INT PRIMARY KEY AUTO_INCREMENT,  
 nomeDepartamento VARCHAR(80) NOT NULL, 
 endereco VARCHAR(255) NOT NULL
); 
CREATE TABLE IF NOT EXISTS Turmas 
( 
 idDisciplina INT,  
 idProfessor INT,  
 idTurma INT PRIMARY KEY AUTO_INCREMENT
); 
CREATE TABLE IF NOT EXISTS Disciplinas 
( 
 idDepartamento INT,  
 idDisciplina INT PRIMARY KEY AUTO_INCREMENT,
 nomeDisciplina VARCHAR(100) NOT NULL
); 
CREATE TABLE Estudantes 
(
 matriculaEstudante INT PRIMARY KEY,  
 email VARCHAR(40) DEFAULT 'mail@mail.com',  
 senha VARCHAR(15) NOT NULL,  
 curso VARCHAR(40) NOT NULL DEFAULT 'Curso Legal',  
 admin INT NOT NULL DEFAULT '0',  
 image MEDIUMBLOB
);
CREATE TABLE IF NOT EXISTS AvaliacaoProfessor 
( 
 matriculaEstudante INT,  
 idProfessor INT,  
 textoAvaliacao VARCHAR(255),  
 nivel INT NOT NULL,  
 idAvaliacaoProfessor INT PRIMARY KEY AUTO_INCREMENT  
); 
CREATE TABLE IF NOT EXISTS AvaliacaoTurma 
( 
 matriculaEstudante INT,  
 idTurma INT,  
 textoAvaliacao VARCHAR(255) NOT NULL,  
 nivel INT NOT NULL,  
 idAvaliacaoTurma INT PRIMARY KEY AUTO_INCREMENT  
); 
CREATE TABLE IF NOT EXISTS Denuncia 
( 
 idAvaliacaoProfessor INT,  
 idAvaliacaoTurma INT,  
 idDenuncia INT PRIMARY KEY AUTO_INCREMENT  
);

ALTER TABLE Professores ADD FOREIGN KEY(idDepartamento) REFERENCES Departamentos (idDepartamento);
ALTER TABLE Turmas ADD FOREIGN KEY(idDisciplina) REFERENCES Disciplinas (idDisciplina);
ALTER TABLE Turmas ADD FOREIGN KEY(idProfessor) REFERENCES Professores (idProfessor);
ALTER TABLE Disciplinas ADD FOREIGN KEY(idDepartamento) REFERENCES Departamentos (idDepartamento);
ALTER TABLE AvaliacaoProfessor ADD FOREIGN KEY(matriculaEstudante) REFERENCES Estudantes (matriculaEstudante);
ALTER TABLE AvaliacaoProfessor ADD FOREIGN KEY(idProfessor) REFERENCES Professores (idProfessor);
ALTER TABLE AvaliacaoTurma ADD FOREIGN KEY(matriculaEstudante) REFERENCES Estudantes (matriculaEstudante);
ALTER TABLE AvaliacaoTurma ADD FOREIGN KEY(idTurma) REFERENCES Turmas (idTurma);
ALTER TABLE Denuncia ADD FOREIGN KEY(idAvaliacaoProfessor) REFERENCES AvaliacaoProfessor (idAvaliacaoProfessor);
ALTER TABLE Denuncia ADD FOREIGN KEY(idAvaliacaoTurma) REFERENCES AvaliacaoTurma (idAvaliacaoTurma);

CREATE VIEW `RankingDisciplinas` AS
SELECT 
    t.idTurma,
    p.nomeProfessor,
    d.nomeDisciplina,
    AVG(at2.nivel) AS MediaNivelAvaliacao
FROM
    Turmas t
INNER JOIN Disciplinas d ON d.idDisciplina  = t.idDisciplina 
INNER JOIN Professores p ON t.idProfessor = p.idProfessor 
INNER JOIN AvaliacaoTurma at2 ON t.idTurma = at2.idTurma
GROUP BY t.idTurma, p.nomeProfessor, d.idDisciplina;

DROP PROCEDURE IF EXISTS avaliacaounb.insere_denuncia;
DELIMITER $$
$$
CREATE PROCEDURE insere_denuncia (IN IdAvaliacao INT)
BEGIN
	INSERT INTO avaliacaounb.Denuncia
	(idAvaliacaoProfessor, idAvaliacaoTurma)
	VALUES(NULL, IdAvaliacao);
END$$
DELIMITER ;
