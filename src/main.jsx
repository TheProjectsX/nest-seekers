import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// React Router Dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.jsx";
import PropertyDetails from "./routes/PropertyDetails.jsx";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("/data/properties.json"),
      },
      {
        path: "/property-details/:id",
        element: <PropertyDetails />,
        loader: () => fetch("/data/properties.json"),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
