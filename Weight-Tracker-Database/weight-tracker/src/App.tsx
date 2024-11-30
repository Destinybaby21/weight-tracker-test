import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Main from "./main";

/**
 * App component serves as the main entry point for the application.
 * It manages routing and authentication state.
 */
const App: React.FC = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  /**
   * Function to handle successful login.
   * Updates the isLoggedIn state to true and logs a message.
   */
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
