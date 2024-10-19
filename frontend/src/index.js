import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import ReqProvider from './Context/requestProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ReqProvider>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  </ReqProvider>
    </BrowserRouter>
);


