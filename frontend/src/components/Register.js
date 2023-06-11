import React from "react";
import {Link} from 'react-router-dom';
import AuthForm from "./AuthForm";

function Register({onSubmit, isLoading}) {
  return (
    <AuthForm
    title={'Регистрация'}
    onSubmit={onSubmit}
    valueText={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
    >
      <p className="login__submit-text">
        Уже зарегистрированы?
        <Link to="/" className="login__entry-link">Войти</Link>
      </p>
    </AuthForm>

  )
}

export default Register;
