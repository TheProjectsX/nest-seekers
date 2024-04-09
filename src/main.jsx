import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// React Router Dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import PrivateRoute from "./components/PrivateRoute.jsx";

// Routes
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import SignUp from "./routes/Signup.jsx";
import PropertyDetails from "./routes/PropertyDetails.jsx";
import UpdateProfile from "./routes/UpdateProfile.jsx";
import Orders from "./routes/Orders.jsx";

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
        path: "/login",
        element: (
          <PrivateRoute reverse={true}>
            <Login />
          </PrivateRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PrivateRoute reverse={true}>
            <SignUp />
          </PrivateRoute>
        ),
      },
      {
        path: "/property-details/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
        loader: () => fetch("/data/properties.json"),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
        loader: () => fetch("/data/properties.json"),
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
