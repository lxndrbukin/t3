import './assets/styles.scss';
import { FormEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
  getCurrentSession,
  googleLogin,
  login,
  register,
} from '../../store';

export default function Auth() {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.session);

  const handleClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(googleLogin());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    if (pathname === '/login') {
      dispatch(login({ email, password }));
    } else {
      dispatch(register({ email, password, name }));
    }
  };

  const renderAuthForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type='text' name='email' placeholder='Email' />
        {pathname === '/login' ? null : (
          <input type='text' name='name' placeholder='Full Name' />
        )}
        <input type='password' name='password' placeholder='Password' />
        <button type='submit'>
          <span>{pathname === '/login' ? 'Login' : 'Sign up'}</span>
        </button>
      </form>
    );
  };

  useEffect(() => {
    dispatch(getCurrentSession());
  }, [dispatch]);

  useEffect(() => {
    if ((pathname === '/login' || pathname === '/register') && isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [pathname, isLoggedIn, navigate]);

  return (
    <div className='auth-container'>
      <div className='auth'>
        <h1>{pathname === '/login' ? 'Login' : 'Sign up'}</h1>
        {renderAuthForm()}
        <div className='auth-divider'>
          <i className='fa-solid fa-right-left'></i>
          <hr />
        </div>
        <div className='auth-buttons'>
          <button className='auth-button google' onClick={handleClick}>
            <i className='fa-brands fa-google'></i>
            <span>
              {pathname === '/login'
                ? 'Login with Google'
                : 'Sign up with Google'}
            </span>
          </button>
          <button className='auth-button facebook' onClick={handleClick}>
            <i className='fa-brands fa-facebook'></i>
            <span>
              {pathname === '/login'
                ? 'Login with Facebook'
                : 'Sign up with Facebook'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
