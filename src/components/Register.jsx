import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegister }) {
  const handleSubmit = (data) => {
    onRegister(data);
  };

  return (
    <main className="start-page fade-in">
      <AuthForm title="Регистрация" buttonText="Зарегистрироваться" onSubmit={handleSubmit} />
      <Link to="/sign-in" className="start-page__link">
        Уже зарегистрированы? Войти
      </Link>
    </main>
  );
}

export default Register;
