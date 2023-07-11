import React, {useEffect, useState}from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CardTurma(props) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const request = {};
    request.idTurma = props.turma;
    request.matriculaEstudanteLogado = props.matricula;
    const response = await fetch(`${props.serverUrl}turma/deleta-turma`, { 
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
      body: JSON.stringify(request)
      });
    window.location.reload();
  }

  const handleEdit = () => {
    navigate("/editar-turma", { state: {
      id: props.turma,
      professor: props.professor,
      idProfessor: props.idProfessor,
      disciplina: props.disciplina,
      idDisciplina: props.idDisciplina
    }})
  };

  const handleAvaliacoes = () => {
    navigate("/avaliacoes", { state: {
      idTurma: props.turma
    }})
  };


  return (
    <div class="ml-3 max-w-md w-full">
      <div class="lg:h-auto lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
      </div>
      <div class="mt-2 h-30 border-r border-b border-l border-black lg:border-l-0 lg:border-t lg:border-black bg-gray-900 rounded-xl lg:rounded-b- lg:rounded-r p-4 flex flex-col">
        <div class="mb-8 justify-evenly">
          <div class="text-white font-bold text-xl mb-2">{props.disciplina}</div>
          <h2 class="text-white text-base">Professor: {props.professor}</h2>
          <h2 class="text-white text-base">Turma: {props.turma}</h2>
        </div>
        <div className='flex flex-row'>
        <a onClick={handleEdit} class="text-white text-sm mb-2 mr-5">
          Editar
        </a>
        <a onClick={handleAvaliacoes} class="text-white text-sm mb-2">
          Avaliar
        </a>
        </div>
      </div>
      <div>
        {(props.admin === 1) ? 
          <button
          type="button"
          onClick={handleDelete} 
          class="mt-1 text-white bg-[#87001f] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-[#87001f] dark:hover:bg-red-700 dark:focus:ring-red-900">
          Deletar turma
          </button>
        : <></>}
      </div>
    </div>
  );
}