import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CardRanking(props) {
  const navigate = useNavigate();

  const handleAvaliacoes = () => {
    navigate("/avaliacoes", {
      state: {
        idTurma: props.turma
      }
    })
  };


  return (
    <div class="ml-3 max-w-2xl w-full">
      <div class="lg:h-auto lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
      </div>
      <div class="mt-2 h-30 border-r border-b border-gray-800 lg:border-l-0 lg:border-t lg:border-black bg-gray-900 rounded-l-md rounded-r-2xl lg:rounded-b-md lg:rounded-r-lg p-4 flex flex-col">
        <div class="mb-8 justify-evenly">
          <div class="text-white font-bold text-xl mb-2">{props.disciplina}</div>
          <hr
            class="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
          <h2 class="text-white text-base">Professor: {props.professor}</h2>
          <h2 class="text-white text-base">Turma: {props.turma}</h2>
          <h2 class="text-white text-base">Nota: {props.nivel}/5</h2>
          <div class="text-white font-bold text-xl mb-2">{`🌟`.repeat(props.nivel)}</div>
        </div>
        <div className='flex flex-row'>
          <a
            onClick={handleAvaliacoes}
            className="float-right rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Ver avaliações
          </a>
        </div>
      </div>
    </div >
  );
}