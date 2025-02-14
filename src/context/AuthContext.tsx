
import React, { createContext, useState,useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AutohideSnackbar from '../components/SnackBar';
import { AlertColor, SnackbarCloseReason } from '@mui/material';

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [severity, setSeverity] = React.useState<AlertColor>('error');
  const baseUrl = import.meta.env.VITE_BASE_URL;

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      console.log('Token found, setting isAuthenticated to true');
    } else {
     setMessage('Sign in To get Started');
      setSeverity('info');
      setSnackbarOpen(true);
      
      console.log('No token found, setting isAuthenticated to false');
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, { email, password });
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        navigate("/");
        setMessage("Signed in successfully.");
        setSeverity('success');
        setSnackbarOpen(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSeverity('error');
        if(error.message === 'Request failed with status code 401'){
          setMessage('Invalid credentials');
        }
        console.log('error',error);
        setSnackbarOpen(true);
      }
  }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, { email, password });
      if (response.data) {
       
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        navigate("/");
        setMessage("Signed up successfully.");
        setSeverity('success');
        setSnackbarOpen(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('error',error);
        setSeverity('error');
        setMessage('user already exists');
        setSnackbarOpen(true);
      }
  }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/signin");
    setMessage("Logged out.");
    setSeverity('success');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signUp, signOut }}>
      {children}
      <AutohideSnackbar open={snackbarOpen} message={message || ''}  severity={severity} onClose={handleCloseSnackbar} />
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};