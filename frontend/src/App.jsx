import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './modules/main_page/navbar';
import Content from './modules/main_page/content';
import Footer from './modules/main_page/footer';
import LoginForm from './modules/login';
import CadastroForm from './modules/cadastro';
import AlterarSenhaForm from './modules/senha/form';
import Painel from './modules/admin/painel';
import PreferenciasForm from './modules/ranking';
import ProtectedRoutes from './services/ProtectedRoutes';
import TurmasComponent from './modules/TurmasComponent';

function Home() {
  return (
    <div>
      <Navbar navigation={[{ name: 'Home', href: '/', current: true },
      { name: 'Turmas', href: '/turma', current: false },
      { name: 'Ranking', href: '#', current: false }]} />
      <Content />
      <Footer />
    </div>
  );
}

function Turmas() {
  return (
    <div>
      <Navbar navigation={[{ name: 'Home', href: '/', current: false },
      { name: 'Turmas', href: '/turma', current: true },
      { name: 'Ranking', href: '#', current: false }]} />
      <TurmasComponent />
    </div>
  );
}

function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

function Cadastro() {
  return (
    <div>
      <CadastroForm />
    </div>
  );
}

function AlterarSenha() {
  return (
    <div>
      <AlterarSenhaForm />
    </div>
  );
}

function Admin() {
  return (
    <div>
      <Painel />
    </div>
  );
}

function Ranking() {
  return (
    <div>
      <Navbar navigation={[{ name: 'Home', href: '/', current: false },
      { name: 'Turmas', href: '/turma', current: false },
      { name: 'Ranking', href: '/cadastar-turma', current: true }]} />
      <Ranking />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/senha" element={<AlterarSenha />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cadastrar-turma" element={<Ranking />} />
          <Route path="/turma" element={<Turmas />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
