import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Spinner, Center } from '@chakra-ui/react';
import { store } from './redux/store';
import App from './App';

// Ленивая загрузка ChakraProvider
const ChakraProvider = React.lazy(() =>
  import('@chakra-ui/react').then((module) => ({
    default: module.ChakraProvider,
  })),
);

function LoadingSpinner() {
  return <Center h="100vh">
    <Spinner size="xl" color="pink.500" thickness="4px" />
  </Center>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<LoadingSpinner />}>
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </Suspense>
    </Provider>
  </React.StrictMode>,
);
