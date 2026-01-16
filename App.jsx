import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard"; 
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("hilton_auth") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  // GİRİŞ YAPMA FONKSİYONU
  const handleLogin = (status) => {
    setIsLoggedIn(true);
    localStorage.setItem("hilton_auth", "true");
  };

  // ÇIKIŞ YAPMA FONKSİYONU 
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("hilton_auth");
  };

  return (
    <div>
      {isLoggedIn ? (

        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;