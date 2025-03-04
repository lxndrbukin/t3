import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

const rootDiv = document.getElementById('root');

if (rootDiv) {
  const root = createRoot(rootDiv);
  root.render(<RouterProvider router={router} />);
}
