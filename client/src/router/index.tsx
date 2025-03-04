import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Auth from '../components/Auth/Auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: '/dashboard',
        element: <h1>Dashboard</h1>,
      },
      {
        path: '/tasks',
        element: <h1>Tasks</h1>,
      },
      {
        path: '/members',
        element: <h1>Members</h1>,
      },
      {
        path: '/settings',
        element: <h1>Settings</h1>,
      },
    ],
  },
]);
