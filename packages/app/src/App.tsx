import React from 'react';
import { Route } from 'react-router';

import { apis } from './apis';

import { createApp } from '@backstage/app-defaults';
import { FlatRoutes } from '@backstage/core-app-api';
import { Home } from './components/Home';

const app = createApp({
  apis,
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();

const routes = (
  <FlatRoutes>
    <Route path="/" element={<Home />} />f
  </FlatRoutes>
);

const App = () => (
  <AppProvider>
    <AppRouter>
      {routes}
    </AppRouter>
  </AppProvider>
);

export default App;
