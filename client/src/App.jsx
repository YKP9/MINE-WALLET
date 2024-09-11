import { Register } from "./pages/Register/register";
import { Login } from "./pages/Login/login";
import { Home } from "./pages/Home/home";
import { ProtectedRoute } from "./components/protectedRoutes";
import { PublicRoute } from "./components/publicRoutes";
import "./styleSheets/alignments.css";
import "./styleSheets/custom-components.css";
import "./styleSheets/form-elements.css";
import "./styleSheets/layout.css";
import "./styleSheets/text-elements.css";
import "./styleSheets/theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
