import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// React Router Dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDataContext from "./context/context.jsx";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: []
  },
]);

const [userAuthData, setUserAuthData] = useState(null);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserDataContext.Provider value={{ userAuthData, setUserAuthData }}>
      <RouterProvider router={router} />
    </UserDataContext.Provider>
  </React.StrictMode>
);
