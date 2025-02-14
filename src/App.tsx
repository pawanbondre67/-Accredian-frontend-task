// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignInPage';
import SignUp from './components/SIgnUpPage';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './Home';
import { AuthProvider, useAuth } from './context/AuthContext';



const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Home /> : <SignIn />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;