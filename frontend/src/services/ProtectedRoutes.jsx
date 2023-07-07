import { Outlet } from 'react-router-dom';
import React from 'react';
import LoginForm from '../modules/login/form';

const useAuth = () => {
  const auth = localStorage.getItem('responseData');

  if (auth) {
    return true;
  }
  return false;
};

function ProtectedRoutes() {
  const isAuth = useAuth();

  if (isAuth) {
    return <Outlet />;
  }
  return <LoginForm />;
}

export default ProtectedRoutes;
