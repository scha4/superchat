import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
