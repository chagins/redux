import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store';
import { App } from 'App';
import { fetchUsers } from 'features/users';
import { worker } from './api/server';

import './index.css';

async function main() {
  await worker.start({ onUnhandledRequest: 'bypass' });
  store.dispatch(fetchUsers());

  const rootElement = document.getElementById('root');

  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
  }
}

main();
