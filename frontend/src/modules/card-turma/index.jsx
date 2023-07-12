import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
    navigate("/editar-turma", {
      state: {
        id: props.turma,
        professor: props.professor,
        idProfessor: props.idProfessor,
        disciplina: props.disciplina,
        idDisciplina: props.idDisciplina
      }
    })
  };

  const handleAvaliacoes = () => {
    navigate("/avaliacoes", {
      state: {
        idTurma: props.turma
      }
    })
  };


  return (
    <div class="ml-3 max-w-md w-full">
      <div class="lg:h-auto lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
      </div>
      <div class="mt-2 h-30 border-r border-b border-gray-800 lg:border-l-0 lg:border-t lg:border-black bg-gray-900 rounded-l-md rounded-r-2xl lg:rounded-b-md lg:rounded-r-lg p-4 flex flex-col">
        <div class="mb-8 justify-evenly">
          <div class="text-white font-bold text-xl mb-2">{props.disciplina}</div>
          <hr
            class="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
          <h2 class="text-white text-base">Professor: {props.professor}</h2>
          <h2 class="text-white text-base">Turma: {props.turma}</h2>
        </div>
        <div className='flex flex-row'>
          {(props.admin === 1) ?
            <div className='w-full'>
              <button className='bg-gray- rounded-md px-3 py-2 text-sm font-medium rounded-md bg-gray-900 text-white hover:bg-gray-700 hover:text-white'
                onClick={handleEdit}>
                Editar
              </button>
            </div>
            :
            <></>}
          <a
            onClick={handleAvaliacoes}
            className="float-right rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Avaliar
          </a>
        </div>
      </div>
      <div>
        {(props.admin === 1) ?
          <button
            type="button"
            onClick={handleDelete}
            class="mt-1 text-white bg-[#87001f] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-[#87001f] dark:hover:bg-red-700 dark:focus:ring-red-900">
            Deletar turma
          </button>
          : <></>}
      </div>
    </div >
  );
}