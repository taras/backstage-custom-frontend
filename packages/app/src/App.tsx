import React, { ComponentType } from 'react';
import { Route } from 'react-router';
import { ThemeProvider, PartialTheme } from '@fluentui/react/lib/Theme';

import { apis } from './apis';

import { createApp } from '@backstage/app-defaults';
import { FlatRoutes } from '@backstage/core-app-api';
import { Home } from './components/Home';

const ourTheme: PartialTheme = {
  semanticColors: {
    primaryButtonBackground: 'red',
    primaryButtonText: 'white',
  },
}

const OurThemeProvider: ComponentType<{}> = ({ children }) => {
  return (<ThemeProvider theme={ourTheme}>{children}</ThemeProvider>)
}

const app = createApp({
  apis,
  components: {
    ThemeProvider: OurThemeProvider,
  }
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
