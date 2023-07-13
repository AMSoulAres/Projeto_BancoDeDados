import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardAvaliacao from '../card-avaliacao';
import { useLocation, useNavigate } from 'react-router-dom'

const serverUrl = 'http://localhost:8000/';

export default function AvaliacoesComponent() {
  const navigate = useNavigate()
  const { state } = useLocation();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [denuncias, setDenuncias] = useState([]);
  const [matricula, setMatricula] = useState(0);
  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      const response = await axios.get(`${serverUrl}avaliacao-turma/avaliacao-turma-por-turma/${state.idTurma}`);
      setAvaliacoes(response.data);
    }

    const fetchDenuncias = async () => {
      const response = await axios.get(`${serverUrl}denuncia/`)
      setDenuncias(response.data);
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
    fetchAvaliacoes();
    fetchDenuncias();
  }, []);

  const handleCadastro = () => {
    navigate("/cadastrar-avaliacao", {
      state: {
        idTurma: state.idTurma,
        matricula: state.matricula
      }
    })
  }

  return (
    <div class="min-h-screen bg-[#1a0409]">
      <div class="flex flex-row justify-between">
        <div className='w-screen'>
          {avaliacoes.map((avaliacao) => (
            
            <CardAvaliacao
              idAvaliacao={avaliacao.idAvaliacaoTurma}
              turma={avaliacao.idTurma}
              nivel={avaliacao.nivel}
              texto={avaliacao.textoAvaliacao}
              matriculaEstudante={avaliacao.matriculaEstudante}
              matriculaLogado={matricula}
              admin={admin}
              serverUrl={serverUrl}
              denuncias={denuncias.filter(denuncia => {
                if (denuncia === avaliacao.idAvaliacaoTurma) {
                  return denuncia
                }}).length}
            />
          ))}
        </div>
        <div className="mt-10 float-right w-80">
          <a
            onClick={handleCadastro}
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Escrever avaliacao
          </a>
        </div>
      </div>
    </ div>
  );
}
