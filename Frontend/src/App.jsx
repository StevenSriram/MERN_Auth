import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

import { FloatingShape, AnimatedLoader } from "./components";
import {
  SignUpPage,
  LoginPage,
  VerifyEmailPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  DashBoardPage,
  NotFoundPage,
  RateLimitPage,
} from "./pages";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import RedirectRoutes from "./routes/RedirectRoutes";

const App = () => {
  const { isCheckingAuth, checkAuth, error } = useAuthStore();
  const [isAppReady, setIsAppReady] = useState(false);

  // ? once Auth Checked - set App Ready
  useEffect(() => {
    checkAuth().finally(() => setIsAppReady(true));
  }, [checkAuth]);

  if (!isAppReady || isCheckingAuth) {
    // ? Show Loading untill checking Auth
    return <AnimatedLoader />;
  }

  if (error === "Network Error. Please try again later.") {
    return <RateLimitPage />;
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
        <Route
          path="/forgot-password"
          element={
            <RedirectRoutes>
              <ForgotPasswordPage />
            </RedirectRoutes>
          }
        ></Route>

        <Route
          path="/reset-password/:token"
          element={
            <RedirectRoutes>
              <ResetPasswordPage />
            </RedirectRoutes>
          }
        ></Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
