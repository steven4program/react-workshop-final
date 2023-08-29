import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './assets/scss/index.scss';
import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/todos';
import ErrorPage from './pages/Error-Page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Todos />} errorElement={<ErrorPage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
