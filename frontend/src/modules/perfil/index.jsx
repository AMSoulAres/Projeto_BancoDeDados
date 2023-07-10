import React, { useState, useEffect } from 'react';
import axios from 'axios';

const serverUrl = 'http://localhost:8000/';

export default function PerfilComponent() {
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [curso, setCurso] = useState('');
  const [image, setImage] = useState();
  const [matriculaError, setMatriculaError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [imageError, setImageError] = useState('');
  const [alteracaoSucesso, setAlteracaoSucesso] = useState('');

  useEffect(() => {
    const getStoredData = () => {
      const userData = JSON.parse(localStorage.getItem('responseData'));

      if (userData.matricula) {
        setMatricula(userData.matricula);
      }
      if (userData.email) {
        setEmail(userData.email);
      }
      if (userData.senha) {
        setSenha(userData.senha);
      }
      if (userData.curso) {
        setCurso(userData.curso);
      }
      if (userData.image) {
        setImage(userData.image);
      }

      fetch(`${serverUrl}estudante/${userData.matricula}/image`)
        .then(response => response.blob())
        .then(imageblob => setImage(imageblob))
    };

    getStoredData();
  }, []);

  const onImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  const validateInputs = () => {
    let hasError = false;

    if (matricula !== '' && !/^\d+$/.test(matricula)) {
      setMatriculaError('A matricula deve conter apenas números.');
      hasError = true;
    } else {
      setMatriculaError('');
    }

    if (email !== '' && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      setEmailError('O campo deve estar no formato de um email.');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (senha !== '' && !/^\d+$/.test(senha)) {
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

    var payload = {};

    if (email !== '') {
      payload.email = email;
    }

    if (senha !== '') {
      payload.senha = senha;
    }

    if (curso !== '') {
      payload.curso = curso;
    }

    try {

      const response = await axios.put(`${serverUrl}estudante/atualiza-estudante/${matricula}`, payload);

      if (response.status === 200) {
        // A conta foi criada com sucesso
        setAlteracaoSucesso('Informações atualizadas com sucesso!');
        localStorage.setItem('responseData', JSON.stringify(response.data));
        // Recarrega a página para atualizar o estado de autenticação

        // Redirecionar para outra página, se necessário
      } else {
        // Algo deu errado ao criar a conta
        setSenhaError('Não foi possível atualizar os dados. Por favor, tente novamente.');
      }
      if (image) {
        const formData = new FormData();
        formData.append("image_file", image, image.name);

        const response = await fetch(`${serverUrl}estudante/insere-imagem/${matricula}`, {
          method: 'POST',
          headers: { 'accept': 'application/json' },
          body: formData
        }
        );
      }

    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
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
        setSenhaError('Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0409]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-50 w-auto"
            src={image}
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
                  readOnly={true}
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
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="image" className="block text-sm font-medium leading-6 text-[#f5f7f7]">
                  Imagem de perfil
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  formEncType='multipart/form-data'
                  accept='.png, .jpeg, .jpg'
                  onChange={onImageChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
              {alteracaoSucesso && <p className="text-green-500 text-xs mt-1">{alteracaoSucesso}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#87001f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ad0303] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Atualizar dados
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}