import React, {useState} from "react";
import eyeClose from '../images/eye-hide.svg';
import eyeOpen from '../images/eye-open.svg';

function AuthForm({title, onSubmit, valueText, valueLoadingText, isLoading, children}) {
  const [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [passOpen, setPassOpen] = useState(false);

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  };

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(email, password);
  };

  function handlePassClick() {
    if (passOpen) {
      setPassOpen(false);
    }

    else {
      setPassOpen(true);
    }
  }

  return (
    <div className="login">
      <form
        className={`login__form login__form_type_email`}
        name="loginForm"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="login__title">{title}</h2>
        <label className="login__label">
        <input
          className="login__field login__field_type_name"
          id="login-field-email"
          name="loginEmail"
          value={email || ''}
          onChange={handleEmailChange}
          type="email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="login__field-error login-field-email-error"></span>
        </label>
        <label className="login__label">
          <input
            className="login__field login__field_type_password"
            id="login-field-password"
            name="loginPassword"
            value={password || ''}
            onChange={handlePasswordChange}
            type={passOpen ? "text" : "password"}
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            required
          />
          <button className="login__password-button"
            name="password-button"
            type="button"
            style={{backgroundImage: `url(${passOpen ? eyeOpen : eyeClose})`}}
            onClick={handlePassClick}
          />
          <span className="login__field-error login-field-password-error"></span>
        </label>
        <input
          className={`login__submit-button`}
          name="login__submit-button"
          type="submit"
          value={isLoading ? valueLoadingText : valueText}
        />
        {children}
      </form>
    </div>
  )
}

export default AuthForm;
