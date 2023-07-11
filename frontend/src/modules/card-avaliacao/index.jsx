import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

export default function CardAvaliacao(props) {
  const navigate = useNavigate();
  const [nivel, setNivel] = useState();
  const [edit, setEdit] = useState(false);

  const options = [
    {label: '🌟'.repeat(5), value: 5},
    {label: '🌟'.repeat(4), value: 4},
    {label: '🌟'.repeat(3), value: 3},
    {label: '🌟'.repeat(2), value: 2},
    {label: '🌟'.repeat(1), value: 1 }
]

  const handleDelete = async () => {
    const request = {};
    request.matriculaEstudanteLogado = props.matriculaEstudante;
    request.idAvaliacaoTurma = props.turma;
    const response = await fetch(`${props.serverUrl}avaliacao-turma/deletar-avaliacao-turma`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
      body: JSON.stringify(request)
    });
    window.location.reload();
  }

  const handleEdit = () => {
    navigate("/editar-avaliacao", {
      state: {
        idAvaliacao: props.idAvaliacao,
        turma: props.turma,
        nivel: props.nivel,
        texto: props.texto,
        matriculaEstudante: props.matriculaEstudante,
        serverUrl: props.serverUrl,
        admin: props.admin
      }
    })
  };
  console.log(props.matriculaLogado)
  console.log(props.matriculaEstudante)

  return (
    <div class="ml-3 max-w-md w-full">
      <div class="lg:h-auto lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
      </div>
      <div class="mt-2 h-30 border-r border-b border-l border-black lg:border-l-0 lg:border-t lg:border-black bg-gray-900 rounded-xl lg:rounded-b- lg:rounded-r p-4 flex flex-col">
        <div class="mb-8 justify-evenly">
          {!edit ?
            <>
              <div class="text-white font-bold text-xl mb-2">{`🌟`.repeat(props.nivel)}</div>
              <h2 class="text-white text-base">Comentário: {props.texto}</h2>
            </>
            :
            <>
              <Select options={options} />
            </>
          }
        </div>
        <div className='flex flex-row'>
          {(props.matriculaEstudante === props.matriculaLogado) ?
            <button 
              onClick={() => {setEdit(!edit)}} class="text-white text-sm mb-2 mr-5">
              Editar
            </button> :
            <></>}
        </div>
      </div>
      <div>
        {(props.matriculaEstudante === props.matricula || props.admin === 1) ?
          <button
            type="button"
            onClick={handleDelete}
            class="mt-1 text-white bg-[#87001f] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-[#87001f] dark:hover:bg-red-700 dark:focus:ring-red-900">
            Deletar
          </button>
          : <></>}
      </div>
    </div>
  );
}