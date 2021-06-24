import AuthForm from './AuthForm';

function Login({ onLogin }) {
  const handleSubmit = (data) => {
    onLogin(data);
  };

  return (
    <main className="start-page fade-in">
      <AuthForm title="Вход" buttonText="Войти" onSubmit={handleSubmit} />
    </main>
  );
}

export default Login;
