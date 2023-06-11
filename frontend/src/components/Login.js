import React from "react";
import AuthForm from "./AuthForm";

function Login({onSubmit, isLoading}) {
  return (
    <AuthForm
    title={'Вход'}
    onSubmit={onSubmit}
    valueText={isLoading ? 'Вход...' : 'Войти'}
    />
  )
}

export default Login;
