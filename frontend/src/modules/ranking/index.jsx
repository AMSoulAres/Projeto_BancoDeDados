import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardRanking from '../card-ranking';

const serverUrl = 'http://localhost:8000/';
export default function RankingComponent() {

  const [turmas, setTurmas] = useState([]);
  const [matricula, setMatricula] = useState(0);
  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    const fetchTurmas = async () => {
      const response = await axios.get(`${serverUrl}funcionalidades/ranking`);
      setTurmas(response.data.reverse());
    }
  
    const getStoredData = () => {
      const userData = JSON.parse(localStorage.getItem('responseData'));

      if (userData.matricula) {
        setMatricula(userData.matricula);
      }

      if (userData.admin) {
        setAdmin(userData.admin);
      }
    };

    getStoredData();
    fetchTurmas();
  }, []);

  console.log(turmas);
  return (
    <div class="min-h-screen bg-[#1a0409]">
      <div class="flex justify-center items-center">
        <div className='w-screen justify-center items-center'>
          {turmas.map((turma) => (
            <CardRanking
              disciplina={turma.nomeDisciplina}
              professor={turma.nomeProfessor}
              turma={turma.idTurma}
              nivel={turma.MediaNivelAvaliacao}
              serverUrl={serverUrl}
              matricula={matricula}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
