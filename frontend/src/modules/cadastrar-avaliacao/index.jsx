import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";

const serverUrl = "http://localhost:8000/";
export default function CadastrarAvaliacaoComponent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [texto, setTexto] = useState('');
  const [nivel, setNivel] = useState(0);
  const [matricula, setMatricula] = useState(0);
  const [cadastroError, setCadastroError] = useState('');
  const [cadastroSucesso, setCadastroSucesso] = useState('');

  useEffect(() => {
    const getStoredData = async () => {
      const userData = JSON.parse(localStorage.getItem('responseData'));

      if (userData.matricula) {
        setMatricula(userData.matricula);
      }
    };
    getStoredData();
  }, [])

  console.log(matricula)
  const options = [
    { label: '🌟'.repeat(5), value: 5 },
    { label: '🌟'.repeat(4), value: 4 },
    { label: '🌟'.repeat(3), value: 3 },
    { label: '🌟'.repeat(2), value: 2 },
    { label: '🌟'.repeat(1), value: 1 }
  ]

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCadastroError('')
    setCadastroSucesso('')

    const idTurma = state.idTurma

    try {
      const response = await axios.post(`${serverUrl}avaliacao-turma/insere-avaliacao-turma`, {
        matriculaEstudante: matricula,
        idTurma: idTurma,
        textoAvaliacao: texto,
        nivel: nivel,
      });

      if (response.status === 201) {
        // A conta foi criada com sucesso
        setCadastroSucesso('Avaliacao efetuada com sucesso!');

        // Redirecionar para outra página, se necessário
      } else {
        // Algo deu errado ao criar a conta
        setCadastroError('Não foi possível criar a turma. Por favor, tente novamente.');
      }
    } catch (err) {
      if (err.response) {
        setCadastroError(err.response.data.detail);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0409]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#f5f7f7]">
            Avalie a turma {state.idTurma}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="items-center justify-between">
              <div className="mt-2">
                <label htmlFor="curso" className="block text-sm font-medium leading-6 text-[#f5f7f7]">
                  Nível
                </label>
                <Select
                  defaultValue={{ label: '🌟'.repeat(nivel), value: nivel }}
                  options={options}
                  onChange={(choice) => { setNivel(choice.value) }}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="curso" className="block text-sm font-medium leading-6 text-[#f5f7f7]">
                  Texto
                </label>
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
              </div>
              {(cadastroError === '') ? <></> : <p className="text-red-600 text-xs mt-1">{cadastroError}</p>}
              {(cadastroSucesso === '') ? <></> : <p className="text-green-500 text-xs mt-1">{cadastroSucesso}</p>}
            </div>
            <div className=' flex flex-col items-center justify-center'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#87001f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ad0303] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Confirmar
              </button>
              <button
                onClick={() => { navigate("/avaliacoes", { state: { idTurma: state.idTurma } }) }}
                className="w-1/4 justify-center rounded-m px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ad0303] hover:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Voltar
              </button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}