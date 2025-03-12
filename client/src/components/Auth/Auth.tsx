import './assets/styles.scss';
import { FormEvent } from 'react';

export default function Auth() {
  return (
    <div className='auth'>
      <h1>Login</h1>
      <div className='auth-buttons'>
        <a className='google' href='/v1/auth/google'>
          <span>Login with Google</span>
        </a>
        <a className='facebook' href='/v1/auth/facebook'>
          <span>Login with Facebook</span>
        </a>
      </div>
    </div>
  );
}
