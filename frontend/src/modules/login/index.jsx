import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';

const serverUrl = 'http://localhost:8000/';

export default function Login() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [matriculaError, setMatriculaError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const handleMatriculaChange = (event) => {
    setMatricula(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const validateInputs = () => {
    let hasError = false;

    if (!matricula) {
      setMatriculaError('O campo matrícula é obrigatório.');
      hasError = true;
    } else if (!/^\d+$/.test(matricula)) {
      setMatriculaError('O campo matrícula  pode conter letras.');
      hasError = true;
    } else {
      setMatriculaError('');
    }

    if (!senha) {
      setSenhaError('O campo senha é obrigatório.');
      hasError = true;
    } else if (!/^\d+$/.test(senha)) {
      setSenhaError('A senha deve conter apenas números.');
      hasError = true;
    } else {
      setSenhaError('');
    }

    return !hasError;
  };

  const loginUser = async () => {
    try {

      const response = await axios.post(`${serverUrl}funcionalidades/login/`, {
        matriculaEstudante: matricula,
        senha,
      });

      if (response.status === 200) {
        localStorage.setItem('responseData', JSON.stringify(response.data));
        window.location.reload(); // Recarrega a página para atualizar o estado de autenticação
      } else if (response.status === 403) {
        setSenhaError('Senha inválida');
      } else if (response.status === 404) {
        const errorMessage = response.data?.detail?.message || 'Usuário não encontrado';
        setMatriculaError(errorMessage);
      } else {
        setMatriculaError('Ocorreu um erro');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        setMatriculaError(error.response.data.detail.message || 'Ocorreu um erro');
      } else {
        setMatriculaError('Ocorreu um erro');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      await loginUser();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        const errorMessage = error.response.data.detail.message || 'Ocorreu um erro';
        setSenhaError(errorMessage);
      } else {
        setMatriculaError('Ocorreu um erro');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0409]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-50 w-auto" src={logo} alt=" Logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#f5f7f7]">
            Acesse sua conta!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="matricula" className="block text-sm font-medium leading-6 text-[#f5f7f7]">
                Matrícula
              </label>
              <div className="mt-2">
                <input
                  id="matricula"
                  name="matricula"
                  type="text"
                  autoComplete="matricula"
                  required
                  value={matricula}
                  onChange={handleMatriculaChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {matriculaError && <p className="text-red-500 text-xs mt-1">{matriculaError}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#f5f7f7]">
                  Senha
                </label>
                <div className="text-sm">
                  <a
                    href="/senha"
                    className="font-semibold text-indigo-600 hover:text-[#87001f] text-[#d40202]"
                  >
                    Deseja alterar sua senha?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={senha}
                  onChange={handleSenhaChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {senhaError && <p className="text-red-500 text-xs mt-1">{senhaError}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="mt-20 flex w-full justify-center rounded-md bg-[#87001f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#d40202] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar
              </button>
              <a
                href="/cadastro"
                type="link"
                className="my-2 flex w-full justify-center rounded-md bg-[#d40202] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#87001f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Crie sua conta
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
