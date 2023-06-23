CREATE TABLE IF NOT EXISTS Professores 
( 
 idDepartamento INT,  
 NomeProfessor VARCHAR(40) NOT NULL DEFAULT 'NomeQualquer',  
 idProfessor INT PRIMARY KEY AUTO_INCREMENT  
); 
CREATE TABLE IF NOT EXISTS Departamentos 
( 
 idDepartamento INT PRIMARY KEY AUTO_INCREMENT,  
 NomeDepartamento VARCHAR(40) NOT NULL  
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
 idDisciplina INT PRIMARY KEY AUTO_INCREMENT  
); 
CREATE TABLE IF NOT EXISTS Estudantes 
( 
 matriculaEstudante INT PRIMARY KEY AUTO_INCREMENT,  
 Email VARCHAR(40) DEFAULT 'mail@mail.com',  
 Senha INT NOT NULL,  
 Curso VARCHAR(40) NOT NULL DEFAULT 'Curso Legal'  
); 
CREATE TABLE IF NOT EXISTS AvaliacaoProfessor 
( 
 matriculaEstudante INT,  
 idProfessor INT,  
 TextoAvaliacao VARCHAR(40),  
 Nivel INT NOT NULL,  
 idAvaliacaoProfessor INT PRIMARY KEY AUTO_INCREMENT  
); 
CREATE TABLE IF NOT EXISTS AvaliacaoTurma 
( 
 matriculaEstudante INT,  
 idTurma INT,  
 TextoAvaliacao VARCHAR(40) NOT NULL,  
 Nivel INT NOT NULL,  
 idAvaliacaoTurma INT PRIMARY KEY AUTO_INCREMENT  
); 
CREATE TABLE IF NOT EXISTS Denuncia 
( 
 idAvaliacaoProfessor INT,  
 idAvaliacaoTurma INT,  
 idDenuncia INT PRIMARY KEY AUTO_INCREMENT  
); 
CREATE TABLE IF NOT EXISTS Turma_tem_estudantes 
( 
 matriculaEstudante INT,  
 idTurma INT  
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
ALTER TABLE Turma_tem_estudantes ADD FOREIGN KEY(matriculaEstudante) REFERENCES Estudantes (matriculaEstudante);
ALTER TABLE Turma_tem_estudantes ADD FOREIGN KEY(idTurma) REFERENCES Turmas (idTurma);
-- --------------------------------
-- INSERTS TEMPLATES
-- INSERT INTO `avaliacaounb`.`professores`
-- (`idDepartamento`,
-- `NomeProfessor`,
-- `idProfessor`)
-- VALUES
-- (<{idDepartamento: }>,
-- <{NomeProfessor: NomeQualquer}>,
-- <{idProfessor: }>);

-- INSERT INTO `avaliacaounb`.`departamentos`
-- (`idDepartamento`,
-- `NomeDepartamento`)
-- VALUES
-- (<{idDepartamento: }>,
-- <{NomeDepartamento: }>);

-- INSERT INTO `avaliacaounb`.`disciplinas`
-- (`idDepartamento`,
-- `idDisciplina`)
-- VALUES
-- (<{idDepartamento: }>,
-- <{idDisciplina: }>);

-- INSERT INTO `avaliacaounb`.`turmas`
-- (`idDisciplina`,
-- `idProfessor`,
-- `idTurma`)
-- VALUES
-- (<{idDisciplina: }>,
-- <{idProfessor: }>,
-- <{idTurma: }>);

-- INSERT INTO `avaliacaounb`.`estudantes`
-- (`matriculaEstudante`,
-- `Email`,
-- `Senha`,
-- `Curso`)
-- VALUES
-- (<{matriculaEstudante: }>,
-- <{Email: mail@mail.com}>,
-- <{Senha: }>,
-- <{Curso: Curso Legal}>);

-- INSERT INTO `avaliacaounb`.`avaliacaoprofessor`
-- (`matriculaEstudante`,
-- `idProfessor`,
-- `TextoAvaliacao`,
-- `Nivel`,
-- `idAvaliacaoProfessor`)
-- VALUES
-- (<{matriculaEstudante: }>,
-- <{idProfessor: }>,
-- <{TextoAvaliacao: }>,
-- <{Nivel: }>,
-- <{idAvaliacaoProfessor: }>);

-- INSERT INTO `avaliacaounb`.`avaliacaoturma`
-- (`matriculaEstudante`,
-- `idTurma`,
-- `TextoAvaliacao`,
-- `Nivel`,
-- `idAvaliacaoTurma`)
-- VALUES
-- (<{matriculaEstudante: }>,
-- <{idTurma: }>,
-- <{TextoAvaliacao: }>,
-- <{Nivel: }>,
-- <{idAvaliacaoTurma: }>);

-- INSERT INTO `avaliacaounb`.`denuncia`
-- (`idAvaliacaoProfessor`,
-- `idAvaliacaoTurma`,
-- `idDenuncia`)
-- VALUES
-- (<{idAvaliacaoProfessor: }>,
-- <{idAvaliacaoTurma: }>,
-- <{idDenuncia: }>);