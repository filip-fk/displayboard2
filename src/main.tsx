import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import Root from "./routes/root"
import SBB from "./components/sbb.tsx"
import ErrorPage from "./routes/error-page.tsx";
import './styles/index.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },{
    path: "/sbb",
    element: <SBB/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

)