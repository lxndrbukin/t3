import './assets/styles.scss';
import { FormEvent } from 'react';

export default function Auth() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='email' placeholder='Email' />
        <input type='password' name='password' placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
      <p>
        Don&apos;t have an account? <a href='/auth/register'>Register</a>
      </p>
      <p>
        <a href='/auth/forgot-password'>Forgot password?</a>
      </p>

      <a className='google' href='/auth/google'>
        <span>Login with Google</span>
      </a>
    </div>
  );
}
