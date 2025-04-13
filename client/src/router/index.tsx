import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Auth from '../components/Auth/Auth';
import Dashboard from '../components/Dashboard/Dashboard';
import Tasks from '../components/Tasks/Tasks';
import BoardsGrid from '../components/Boards/BoardsGrid';
import Section from '../assets/reusable/Section';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
      },
      {
        path: '/boards',
        element: <BoardsGrid />,
      },
      {
        path: '/members',
        element: <h1>Members</h1>,
      },
      {
        path: '/settings',
        element: <h1>Settings</h1>,
      },
      {
        path: '/test',
        element: (
          <Section header='Test'>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
              unde distinctio natus nihil officiis repellat magnam, atque ipsam
              veritatis aspernatur incidunt sequi ducimus exercitationem.
              Dolorum aliquid iure nam amet asperiores!
            </div>
          </Section>
        ),
      },
    ],
  },
]);
