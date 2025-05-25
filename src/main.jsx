  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App.jsx'
  import './index.css'
  import StripeProvider from './StripeProvider';
  import { AuthProvider } from '../src/Component/Context/AuthContext.jsx';
import { UserProvider } from './Component/Context/UserContext.jsx';

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider>
        <UserProvider>
          <StripeProvider>
            <App />
          </StripeProvider>
        </UserProvider>
      </AuthProvider>
    </React.StrictMode>,
  )
