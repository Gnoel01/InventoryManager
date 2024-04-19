//import logo from './logo.svg';
import React, {useState, useEffect, Fragment} from "react"; 
//import axios from 'axios';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

//import { toast } from "react-toastify";

//components

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

//toast.configure();

function App() {

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:8081/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };




return (
  <Fragment>
  <Router>
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate replace to="/dashboard" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate replace to="/dashboard" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  </Fragment>
);
}
export default App;


// function portion for authentication

  // const [usernameReg, setUsernameReg] = useState('')
  // const [passwordReg, setPasswordReg] = useState('')

  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  // const [loginStatus, setLoginStatus] = useState('')

  // const register = () => {
  //   axios.post('http://localhost:8081/register', {
  //     username: usernameReg,
  //     password: passwordReg,
  //   }).then((response) => {
  //     console.log(response)
  //   })
  // }

  // const login = () => {
  //   axios.post('http://localhost:8081/register', {
  //     username: username,
  //     password: password,
  //   }).then((response) => {
  //       if (response.data.message) {
  //         setLoginStatus(response.data.message)
  //       } else {
  //         setLoginStatus(response.data[0])
  //       }
  //   });
  // };


//return fortion for authentication
      {/* <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" 
          onChange={(e) => {
          setUsernameReg(e.target.value)
        }}/>
        <label>Password</label>
        <input type="text"
        onChange={(e) => {
          setPasswordReg(e.target.value)
        }}/>
        <button onClick={register}>Register</button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username..." 
        onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <input type="password" placeholder="Password..." 
        onChange={(e) => {
          setPassword(e.target.value)
        }}/>
        <button onClick={login}>Login</button>
      </div>

      <h1>{loginStatus}</h1> */}



      // calling inventory
      //   const [inv, setInv] = useState([]);
//   // const [item_id, setItem_id] = useState([]);
//   // const [item_name, setItem_name] = useState([]);
//   // const [user_id, setUser_id] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8081/inventory')
//       .then(response => response.json())
//       .then(data => {
       
//         console.log("Complete Inventory", data)
//         setInv(data)
// })
//   }, []);