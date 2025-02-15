import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from './context/AuthContext';
import { TodoProvider } from "./context/TodoContext";
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <TodoProvider>
    <AuthProvider>
       <App />
    </AuthProvider>
    </TodoProvider>
  </StrictMode>
)
