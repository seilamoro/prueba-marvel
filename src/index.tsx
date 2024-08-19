import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SuperheroesListView from './components/superheroes/SuperheroesListView';
import SuperheroDetail from './components/superheroes/SuperheroDetail';
import { DataContextProvider } from './application/provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <SuperheroesListView/>,
  },
  {
    path: "/detail/:id",
    element: <SuperheroDetail/>,
  }
]);

root.render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
      <main>
        <RouterProvider router={router} />
      </main>
    </DataContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
