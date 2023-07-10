import React, { useEffect, useState } from 'react';
import Card from '../card';
import axios from 'axios';

const serverUrl = 'http://localhost:8000/';

export default function TurmasComponent() {
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const fetchTurmas = async () => {
      const response = await axios.get(`${serverUrl}turma/context`);
      setTurmas(response.data);
    }
    fetchTurmas();
    console.log(turmas)
  }, []);

  return (
    <div class="min-h-screen justify-center bg-[#1a0409]">
      <>
        {turmas.map((turma) => (
          <Card disciplina={turma.nomeDisciplina} professor={turma.nomeProfessor} turma={turma.idTurma} />
        ))}
      </>
    </ div>
  );
}
