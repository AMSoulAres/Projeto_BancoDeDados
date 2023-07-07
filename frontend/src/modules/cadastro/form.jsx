import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';

const serverUrl = 'http://localhost:8000/';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [curso, setCurso] = useState('');
  const [images, setImages] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [contaSucesso, setContaSucesso] = useState('');

  const onImageChange = () => {
    setImages([...e.target.files]);
  }

  const validateInputs = () => {
    let hasError = false;

    if (!email) {
      setEmailError('O campo usuário é obrigatório.');
      hasError = true;
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      setEmailError('O campo deve estar no formato de um email.');
      hasError = true;
    } else {
      setEmailError('');
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post(`${serverUrl}estudante/insere-estudante`, {
        matricula,
        email,
        senha,
        curso: 'Engenharia de Computação',
        admin: 0,
      });

      if (response.status === 201) {
        // A conta foi criada com sucesso
        setContaSucesso('Conta criada com sucesso!');
        // Redirecionar para outra página, se necessário
      } else {
        // Algo deu errado ao criar a conta
        setSenhaError('Não foi possível criar a conta. Por favor, tente novamente.');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          // Erro de requisição inválida (400)
          setEmailError('Esse nome de usuário já existe. Por favor escolha outro.');
        } else if (err.response.status === 404) {
          // Página não encontrada (404)
          setSenhaError('Endpoint não encontrado. Por favor, verifique a URL do servidor.');
        } else if (err.response.status === 422) {
          // Erro de validação (422)
          const { detail } = err.response.data;
          let errorMessage = 'Erro de validação. Por favor, verifique os dados fornecidos.';

          if (detail && Array.isArray(detail) && detail.length > 0) {
            errorMessage = detail.map((error) => error.msg).join('\n');
          }

          setSenhaError(errorMessage);
        }
      } else {
        // Outro erro de requisição
        setSenhaError('Ocorreu um erro ao criar a conta. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-50 w-auto"
            src={logo}
            alt="Atlax Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#53a9f6]">
            Crie sua conta!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#53a9f6]">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="senha" className="block text-sm font-medium leading-6 text-[#53a9f6]">
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="senha"
                  name="senha"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {senhaError && <p className="text-red-500 text-xs mt-1">{senhaError}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="curso" className="block text-sm font-medium leading-6 text-[#53a9f6]">
                  Curso
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="curso"
                  name="curso"
                  type="text"
                  autoComplete="curso"
                  required
                  value={curso}
                  onChange={(event) => setCurso(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {contaSucesso && <p className="text-green-500 text-xs mt-1">{contaSucesso}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="image" className="block text-sm font-medium leading-6 text-[#53a9f6]">
                  Imagem de perfil
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="image"
                  value={curso}
                  multiple
                  accept='image/*'
                  onChange={onImageChange}
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
              {contaSucesso && <p className="text-green-500 text-xs mt-1">{contaSucesso}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#53a9f6] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Criar conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
