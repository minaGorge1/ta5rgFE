import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from './components/Home/Home';
import Masterlayout from './components/Masterlayout/Masterlayout';
import React, { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Regsiter from './components/Regsiter/Regsiter';
import Notfound from './components/NotFound/Notfound';
import jwt_decode from 'jwt-decode';
import Food from './components/Food/Food';

function App() {
  let [user, setUser] = useState(null)

  useEffect(() => { /* check zyada */
    if (localStorage.getItem('token') != null) { // mlyan
      saveUserData()
    }
  }, [])



  function saveUserData() {
    let token = localStorage.getItem('token')
    //token
    let data = jwt_decode(token)
    //decode- fok al token 
    setUser(data)
    //setuset- yt7t fy al user
  }

  function ProtectedRouter(props) {
    if (localStorage.getItem("token") == null) {
      //login
      return <Navigate to='/login' /> // 
    }
    else {
      //path
      return props.children
    }

  }

  function LogOut() {
    localStorage.removeItem('token')
    setUser(null)
    return <Navigate to='/login' />

  }



  let Routers = createBrowserRouter([
    {
      path: '/', element: <Masterlayout user={user} LogOut={LogOut} />, children: [
        { path: '/', element: <ProtectedRouter><Home saveUser={user} /></ProtectedRouter> }, // index : true
        { path: 'Food/:nameDisease', element: <ProtectedRouter><Food /></ProtectedRouter> },
        { path: 'home', element: <ProtectedRouter><Home saveUser={user} /></ProtectedRouter> },
        { path: 'login', element: <Login saveUser={saveUserData} /> },
        { path: 'regsiter', element: <Regsiter /> },
        { path: '*', element: <Notfound /> }
      ]
    }


  ])


  return (
    <RouterProvider router={Routers} />
  );
}

export default App;