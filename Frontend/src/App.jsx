import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { FloatingShape } from "./components";
import {
  SignUpPage,
  LoginPage,
  ForgotPasswordPage,
  VerifyEmailPage,
} from "./pages";

const App = () => {
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
        <Route path="/" element={"Home"}></Route>

        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/verify-email" element={<VerifyEmailPage />}></Route>

        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
