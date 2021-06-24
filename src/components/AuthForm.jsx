import { useState } from 'react';

function AuthForm({ title, buttonText, onSubmit }) {
  const [inputValues, setInputValues] = useState({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(inputValues);
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  return (
    <form className="form form_type_start-page" name="loginForm" onSubmit={handleSubmit}>
      <h2 className="form__heading form__heading_type_start-page">{title}</h2>
      <fieldset className="form__input-container form__input-container_type_start-page">
        <input
          className="form__input form__input_type_start-page form__input_el_register-email"
          id="login-email-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={inputValues['email'] || ''}
          required
        />
        <span className="form__error form__error_type_start-page register-email-input-error"></span>
        <input
          className="form__input form__input_type_start-page form__input_el_register-password"
          id="login-password-input"
          type="password"
          name="password"
          minLength="8"
          placeholder="Пароль"
          onChange={handleInputChange}
          value={inputValues['password'] || ''}
          required
        />
        <span className="form__error form__error_type_start-page register-password-input-error"></span>
      </fieldset>
      <button className="form__submit-btn form__submit-btn_type_start-page" type="submit">
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
