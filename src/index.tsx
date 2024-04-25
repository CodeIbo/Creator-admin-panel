import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import { AuthProvider } from './Services/Context/Auth/AuthProvider';
import { AlertProvider } from './Services/Context/Alert/AlertProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <CookiesProvider
      defaultSetOptions={{
        secure: true,
        maxAge: 300,
        sameSite: true,
        path: '/',
      }}
    >
      <AuthProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </AuthProvider>
    </CookiesProvider>
  </BrowserRouter>
);
