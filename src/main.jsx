import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/index.css";
import App from "./pages/App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/useAuth";
import PrivateRoute from "./util/PrivateRoute";
import Navbar from "./components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Courses from "./pages/Courses";
import Students from "./pages/Students";

const theme = createTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute type="both">
            <App />
          </PrivateRoute>
        ),
      },
      {
        path: "/students",
        element: (
          <PrivateRoute type="admin">
            <Students />
          </PrivateRoute>
        ),
      },
      {
        path: "/courses",
        element: (
          <PrivateRoute type="both">
            <Courses />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "*",
        element: <div>404 NOT FOUND...</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </AuthProvider>
  </ThemeProvider>
);
