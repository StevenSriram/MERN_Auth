import React from "react";
import FloatingShape from "./components/FloatingShape";

const App = () => {
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-gray-900
     via-green-900 to-emerald-900 flex justify-center items-center
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
    </main>
  );
};

export default App;