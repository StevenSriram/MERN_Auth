import { React, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

import { FloatingShape } from "./components";
import {
  SignUpPage,
  LoginPage,
  ForgotPasswordPage,
  VerifyEmailPage,
  DashBoardPage,
} from "./pages";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isValid) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isValid) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const { user, isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(`isAuthenticated : ${isAuthenticated}`);
  console.log(`User : ${user?.isValid}`);

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-gray-800
     via-green-800 to-emerald-800 flex justify-center items-center
      relative overflow-hidden"
    >
      <FloatingShape
        color="bg-gray-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <DashBoardPage />
            </ProtectedRoutes>
          }
        ></Route>

        <Route
          path="/signup"
          element={
            <RedirectRoutes>
              <SignUpPage />
            </RedirectRoutes>
          }
        ></Route>
        <Route
          path="/verify-email"
          element={
            <RedirectRoutes>
              <VerifyEmailPage />
            </RedirectRoutes>
          }
        ></Route>

        <Route
          path="/login"
          element={
            <RedirectRoutes>
              <LoginPage />
            </RedirectRoutes>
          }
        ></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
