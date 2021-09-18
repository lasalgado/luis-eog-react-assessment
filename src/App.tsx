import React, { FC } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { Container } from '@material-ui/core';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import MetricSelector from './Features/MetricSelector';
import MeasuresContainer from './Features/MeasuresContainer';
import { store } from './redux/store';

import { useStyles } from './App.styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const App: FC = () => {
  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Wrapper>
            <Header />
            <Container fixed className={classes.container}>
              <MetricSelector />
              <MeasuresContainer />
              <ToastContainer />
            </Container>
          </Wrapper>
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
