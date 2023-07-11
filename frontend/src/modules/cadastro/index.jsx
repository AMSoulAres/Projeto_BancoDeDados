import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';

const serverUrl = 'http://localhost:8000/';

export default function Cadastro() {
  const navigate = useNavigate();

  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [curso, setCurso] = useState('');
  const [image, setImage] = useState();
  const [matriculaError, setMatriculaError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [contaSucesso, setContaSucesso] = useState('');

  const onImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  const validateInputs = () => {
    let hasError = false;

    if (!matricula) {
      setMatriculaError('O campo matrícula é obrigatório.');
      hasError = true;
    } else if (!/^\d+$/.test(matricula)) {
      setMatriculaError('A matricula deve conter apenas números.');
      hasError = true;
    } else {
      setMatriculaError('');
    }

    if (!email) {
      setEmailError('O campo email é obrigatório.');
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
        curso,
        admin: 0,
      });

      if (response.status === 201) {
        // A conta foi criada com sucesso
        setContaSucesso('Conta criada com sucesso!');
        localStorage.setItem('responseData', JSON.stringify(response.data));
        // Recarrega a página para atualizar o estado de autenticação
        navigate('/');

        // Redirecionar para outra página, se necessário
      } else {
        // Algo deu errado ao criar a conta
        setSenhaError('Não foi possível criar a conta. Por favor, tente novamente.');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          // Erro de requisição inválida (400)
          setMatriculaError('Essa matricula já existe. Por favor, escolha outra.');
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
    <div className="min-h-screen flex items-center justify-center bg-[#1a0409]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-50 w-auto"
            src={logo}
            alt="Atlax Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#f5f7f7]">
            Crie sua conta!
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
                  type="number"
                  autoComplete="matricula"
                  required
                  value={matricula}
                  onChange={(event) => setMatricula(event.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {matriculaError && <p className="text-red-500 text-xs mt-1">{matriculaError}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#f5f7f7]">
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="senha" className="block text-sm font-medium leading-6 text-[#f5f7f7]">
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {senhaError && <p className="text-red-500 text-xs mt-1">{senhaError}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="curso" className="block text-sm font-medium leading-6 text-[#f5f7f7]">
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {contaSucesso && <p className="text-green-500 text-xs mt-1">{contaSucesso}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#87001f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ad0303] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
