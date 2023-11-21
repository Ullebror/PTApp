import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Customerlist from './components/Customerlist.jsx';
import Trainingslist from './components/Trainingslist.jsx';
import MyCalendar from './components/MyCalendar.jsx';

const router = createBrowserRouter([
  {
  path: "/",
  element: <App />,
  children: [
    {
      element: <Customerlist />,
      index: true
    },
    {
      path: "trainings",
      element: <Trainingslist />,
    },
    {
      path: "calendar",
      element: <MyCalendar />,
    },
  ]
  },
  ]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
