import React  from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root.jsx';
import Home from "./routes/Home.jsx";
import './index.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Brawlstar from "./routes/Brawlstar.jsx";
import Create from "./routes/Create.jsx";
import Info from "./routes/Info.jsx";
import Edit from "./routes/Edit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/create",
        element: <Create/>
      },
      {
        path: "/star/:id",
        element: <Brawlstar/>,
        children: [
          {
            path: "/star/:id/",
            element: <Info/>
          },
          {
            path: "/star/:id/edit",
            element: <Edit/>
          }
        ]
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
