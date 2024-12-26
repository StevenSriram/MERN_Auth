import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

import { FloatingShape, AnimatedLoader } from "./components";
import {
  SignUpPage,
  LoginPage,
  ForgotPasswordPage,
  VerifyEmailPage,
  DashBoardPage,
} from "./pages";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import RedirectRoutes from "./routes/RedirectRoutes";

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const [isAppReady, setIsAppReady] = useState(false);

  // ? once Auth Checked - set App Ready
  useEffect(() => {
    checkAuth().finally(() => setIsAppReady(true));
  }, [checkAuth]);

  if (!isAppReady || isCheckingAuth) {
    // ? Show Loading untill checking Auth
    return <AnimatedLoader />;
  }

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
