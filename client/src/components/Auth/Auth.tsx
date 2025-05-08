import './assets/styles.scss';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, googleLogin } from '../../store';

export default function Auth() {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(googleLogin());
  };

  const renderAuthForm = () => {
    return (
      <form>
        <input type='text' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
    );
  };

  return (
    <div className='auth-container'>
      <div className='auth'>
        <h1>Login</h1>
        {renderAuthForm()}
        <div className='auth-buttons'>
          <button className='auth-button google' onClick={handleClick}>
            <i className='fa-brands fa-google'></i>
            <span>Login with Google</span>
          </button>
          <button className='auth-button facebook' onClick={handleClick}>
            <i className='fa-brands fa-facebook'></i>
            <span>Login with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
}
