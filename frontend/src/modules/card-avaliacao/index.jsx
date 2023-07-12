import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CardAvaliacao(props) {
  const navigate = useNavigate();
  const [nivel, setNivel] = useState(props.nivel);
  const [texto, setTexto] = useState(props.texto);
  const [edit, setEdit] = useState(false);

  const options = [
    { label: '🌟'.repeat(5), value: 5 },
    { label: '🌟'.repeat(4), value: 4 },
    { label: '🌟'.repeat(3), value: 3 },
    { label: '🌟'.repeat(2), value: 2 },
    { label: '🌟'.repeat(1), value: 1 }
  ]

  const handleDelete = async () => {
    const request = {};
    console.log();
    request.matriculaEstudanteLogado = props.matriculaEstudante;
    request.idAvaliacaoTurma = props.idAvaliacao;
    const response = await fetch(`${props.serverUrl}avaliacao-turma/deletar-avaliacao-turma`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
      body: JSON.stringify(request)
    });
    window.location.reload();
  }

  const handleEdit = async () => {
    const response = await axios.put(`${props.serverUrl}avaliacao-turma/atualiza-avaliacao-turma/${props.idAvaliacao}`, {
      textoAvaliacao: texto,
      nivel: nivel
    })
    window.location.reload();
  };

  return (
    <div class="ml-3 max-w-md w-full">
      <div class="lg:h-auto lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
      </div>
      <div class="mt-2 h-30 border-r border-b border-gray-800 lg:border-l-0 lg:border-t lg:border-black bg-gray-900 rounded-xl lg:rounded-b- lg:rounded-r p-4 flex flex-col">
        <div class="mb-8 justify-evenly">
          {!edit ?
            <>
              <div class="text-white font-bold text-xl mb-2">{`🌟`.repeat(nivel)}</div>
              <hr
                class="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
              <h2 class="pt-30 text-white text-base">{props.texto}</h2>
            </>
            :
            <>
              <Select
                defaultValue={{ label: '🌟'.repeat(nivel), value: nivel }}
                options={options}
                onChange={(choice) => { setNivel(choice.value) }}
              />
              <div className='mt-2'>
                <textarea
                  id="texto"
                  name="texto"
                  type="text"
                  autoComplete="texto"
                  required
                  value={texto}
                  onChange={(event) => setTexto(event.target.value)}
                  className="resize-y shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </>
          }
        </div>
        <div className='flex flex-row'>
          {(props.matriculaEstudante === props.matriculaLogado) ?
            <div className='w-full'>
              <button className={classNames(
                edit ? 'bg-gray-900 text-white hover:bg-gray-700 hover:text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'bg-gray- rounded-md px-3 py-2 text-sm font-medium',
              )}
                onClick={() => { setEdit(!edit) }} class="text-white text-sm mb-2 mr-5">
                Editar
              </button>
              {edit ?
                <a
                  onClick={handleEdit}
                  className="float-right rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Alterar
                </a>
                : <></>
              }
            </div>
            :
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