import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardTurma from '../card-turma';

const serverUrl = 'http://localhost:8000/';

export default function TurmasComponent() {
  const [turmas, setTurmas] = useState([]);
  const [matricula, setMatricula] = useState(0);
  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    const fetchTurmas = async () => {
      const response = await axios.get(`${serverUrl}turma/context`);
      setTurmas(response.data);
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

  return (
    <div class="min-h-screen bg-[#1a0409]">
      <div class="flex flex-row justify-between">
      <div className='w-screen'>
        {turmas.map((turma) => (
          <CardTurma
          disciplina={turma.nomeDisciplina}
          idDisciplina={turma.idDisciplina} 
          professor={turma.nomeProfessor}
          idProfessor={turma.idProfessor}
          turma={turma.idTurma} 
          admin={admin}
          serverUrl={serverUrl}
          matricula={matricula} />
          ))}
      </div>
      <div className="mt-10 float-right w-80">
              <a
                href="/cadastrar-turma"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                Cadastrar turma
              </a>
      </div>
                </div>
    </ div>
  );
}
