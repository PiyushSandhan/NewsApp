
import React from 'react';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Registration';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateProfile from './components/UpdateProfile';

function App() {
  return (
    <Router>
      <Routes>
      <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <News />
                        </ProtectedRoute>
                    } 
                />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/update-profile' element={<UpdateProfile />} />
      </Routes>
      </Router>
  );
}

export default App;