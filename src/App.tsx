/* eslint-disable @typescript-eslint/no-explicit-any */
// src/App.tsx
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Dashboard from "./pages/DashboardPage";
import Layout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (location.pathname === "/") {
      navigate(token ? "/dashboard" : "/login");
    }

    if (token && location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [location.pathname, navigate, token]);

  const ProtectedRoute = (children: any) => {
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      {/* This case is already handled in useEffect */}
      <Route path="/" element={<></>} />

      <Route
        path="/login"
        element={
          token ? (
            <Navigate to="/dashboard" />
          ) : (
            <Layout>
              <LoginPage />
            </Layout>
          )
        }
      />

      <Route
        path="/dashboard"
        element={<Layout>{ProtectedRoute(<Dashboard />)}</Layout>}
      />

      <Route
        path="/chat"
        element={
          <Layout>
            {ProtectedRoute(<div className="p-4">Chat Page</div>)}
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={<Layout>{ProtectedRoute(<ProfilePage />)}</Layout>}
      />

      <Route
        path="/skills"
        element={
          <Layout>
            {ProtectedRoute(<div className="p-4">Skills Page</div>)}
          </Layout>
        }
      />

      <Route
        path="/signup"
        element={
          <Layout>
            <SignUpPage />
          </Layout>
        }
      />

      <Route
        path="*"
        element={
          <Layout>
            <NotFoundPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
