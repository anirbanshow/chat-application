import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/auth';
import ChatProvider from './context/ChatProvider';
import SelectedChatProvider from './context/SelectedChatProvider';
import ListProvider from './context/ListProvider';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <AuthProvider>
      <ChatProvider>
        <SelectedChatProvider>
          <ListProvider>

            <BrowserRouter>
              <App />
            </BrowserRouter>

          </ListProvider>
        </SelectedChatProvider>
      </ChatProvider>
    </AuthProvider>

  </React.StrictMode>
);