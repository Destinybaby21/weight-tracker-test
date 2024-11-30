import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Main from "./main";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Function to handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    console.log("Login successful, navigating to main.");
  };

  return (
    <Router>
      <Routes>
        {/* Route for the Login Page */}
        <Route path="/" element={<Login onLogin={handleLoginSuccess} />} />

        {/* Route for Main Page */}
        <Route
          path="/main"
          element={isLoggedIn ? <Main /> : <Login onLogin={handleLoginSuccess} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
