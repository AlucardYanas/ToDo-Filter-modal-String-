import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ChakraProvider } from './providers/ChakraProvider';

// Предзагрузка критических компонентов
const criticalComponents = import('./components/critical');

// Ленивая загрузка App компонента
const App = React.lazy(() =>
  import('./App').then((module) =>
    // Убедимся, что критические компоненты загружены
    criticalComponents.then(() => module),
  ),
);

// Оптимизированный компонент загрузки
function LoadingSpinner(): JSX.Element {
  return (
    <div className="loading-spinner">
      <div style={{ width: '80%', maxWidth: '600px' }}>
        <div className="skeleton" style={{ width: '60%' }} />
        <div className="skeleton" style={{ width: '80%' }} />
        <div className="skeleton" style={{ width: '70%' }} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
);
