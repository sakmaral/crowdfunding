import { appStarted } from '@/shared/init';
import { router } from '@/shared/routing/router.ts';
import { RouterProvider } from 'atomic-router-react';
import { allSettled, fork } from 'effector';
import { Provider } from 'effector-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';
const scope = fork();

allSettled(appStarted, { scope })
  .then(() => console.log('Routing started'))
  .catch(() => console.warn('Failed to start the app'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider value={scope}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
);
