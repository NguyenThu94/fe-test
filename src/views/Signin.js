import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'

import { useAuth } from "../context/Auth";

import logo from '../assets/images/logo.png';

const Signin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg('');
  }, [userName, password])

  const handleSignin = () => {
    axios({
      url: "https://fakestoreapi.com/auth/login",
      method: 'POST',
      data: {
        username: userName,
        password: password
      },
    }).then(res => {
      console.log(res.data.token);
      Cookies.set('token', res.data.token)
      setUser({ userName: userName, password: password })
      navigate('/')
    })
      .catch((err) => {
        console.log(err.response);
        setErrMsg(err.response.data)
      })
  }
  return (
    <div className="container container-signin">
      <header>
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
      </header>
      <div className="form-container">

        <h1>Sign In</h1>
        <p>username: mor_2314</p>
        <p>password: 83r5^_</p>
        <div className="form-signin">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {errMsg && <p className="error">{errMsg}</p>}
          <button onClick={handleSignin}>Sign In</button>
        </div>
      </div>

    </div>
  )
}

export default Signin
