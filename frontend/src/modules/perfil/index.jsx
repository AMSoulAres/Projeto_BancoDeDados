import React, { useState, useEffect } from 'react';
import axios from 'axios';

const serverUrl = 'http://localhost:8000/';

export default function PerfilComponent() {
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [curso, setCurso] = useState('');
  const [admin, setAdmin] = useState('');
  const [image, setImage] = useState();
  const [newImage, setNewImage] = useState();
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
      if (userData.admin) {
        setAdmin(userData.admin);
      }

    };
    const fetchImage = async () => {
      const userData = JSON.parse(localStorage.getItem('responseData'));
      const res = await fetch(`${serverUrl}estudante/image/${userData.matricula}`)
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImage(imageObjectURL);
    };
    
    getStoredData();
    fetchImage()
  }, []);

  const onImageChange = (e) => {
    console.log(e.target.files[0]);
    setNewImage(e.target.files[0]);
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
      } else {
        // Algo deu errado ao criar a conta
        setSenhaError('Não foi possível atualizar os dados. Por favor, tente novamente.');
      }
      if (newImage) {
        const formData = new FormData();
        formData.append("image_file", newImage, newImage.name);
        const response = await fetch(`${serverUrl}estudante/insere-imagem/${matricula}`, {
          method: 'POST',
          headers: { 'accept': 'application/json' },
          body: formData
        }
        );
      }
      window.location.reload();

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
        console.log(err)
        setSenhaError('Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.');
      }
    }
  };

  const handleDelete = async () => {
    const userData = JSON.parse(localStorage.getItem('responseData'));
    const response = await fetch(`${serverUrl}estudante/deleta-estudante/${userData.matricula}`, {method: 'DELETE'});
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0409]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-48 max-h-full rounded-full"
            src={image}
            alt="Imagem usuário"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#f5f7f7]">
            Informações pessoais
          </h2>
        </div>
        <h3 className="mt-2 text-center text-1xl font-bold leading-9 tracking-tight text-[#f5f7f7]">
            Tipo de conta: {(admin === 0) ? <>Conta comum</> : <>Administrador</>}
          </h3>
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
            <div>
              <button
                onClick={handleDelete}
                className="flex w-full justify-center rounded-md bg-[#ff002b] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ad0303] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Excluir conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}