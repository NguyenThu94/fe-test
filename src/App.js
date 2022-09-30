import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider, RequireAuth } from "./context/Auth";
import Home from './views/Home'
import Signin from './views/Signin'
import Profile from './views/Profile'

import './App.css';

const App = () => {

  return (
    <div className="wrapper">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
