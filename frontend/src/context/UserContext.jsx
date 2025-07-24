import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; // Optional: To decode the JWT token
import { useNavigate } from 'react-router';
import axios from 'axios';
export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate=useNavigate()
  // Check auth status by verifying cookie
  const checkAuth = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        'http://localhost:5000/api/auth/me',
        { withCredentials: true }
      );
      setUser(response.data.user);
      
    } catch (error) {
      setUser(null);
    }
  };
  // No need for manual token handling
   const login = async () => {
    // Wait a brief moment to ensure cookie is set
    await new Promise(resolve => setTimeout(resolve, 100));
    await checkAuth();
  };
const logout = async () => {
    await axios.post(
      'http://localhost:5000/api/auth/logout',
      {},
      { withCredentials: true }
    );
    setUser(null);
    navigate('/');
  };
  useEffect(() => {
    checkAuth();
   
  }, []);
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
