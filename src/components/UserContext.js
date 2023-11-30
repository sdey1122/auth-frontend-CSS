import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state

  // Function to login the user
  const login = (userData) => {
    // Explicitly setting username and token
    setUser({ username: userData.username, token: userData.token });

    // Store the user data in local storage
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  // Function to logout the user
  const logout = () => {
    setUser(null); // Clear user data on logout
    localStorage.removeItem("userData"); // Clear the user data from local storage
  };

  // Effect to check if user data is stored in local storage when app loads
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser({ username: userData.username, token: userData.token });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
