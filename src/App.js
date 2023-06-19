import React, { useEffect, useState } from 'react'
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import JoblyApi from './api';

// Need to write tests for all of these
function App() {
  const navigate = useNavigate()

  const [token, setToken] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [applications, setApplications] = useState(new Set())
  const [error, setError] = useState()
  const [message, setMessage] = useState('')

  // check local storage on first render
  useEffect(() => {
    const localStorageToken = localStorage.getItem('token')
    const localStorageCurrentUser = localStorage.getItem('currentUser')
    JoblyApi.token = localStorageToken

    if (localStorageToken) setToken(localStorageToken)
    if (localStorageCurrentUser) setCurrentUser(localStorageCurrentUser)
  }, [])


  const login = async (data) => {
    try {
      const user = await JoblyApi.loginUser(data)
      localStorage.setItem('currentUser', user.currentUser)
      localStorage.setItem('token', user.token)
      setToken(user.token)
      setCurrentUser(user.currentUser)
      navigate('/')
    } catch (e) {
      setError(e)
    }
  }

  const register = async (data) => {
    try {
      const user = await JoblyApi.registerUser(data)
      localStorage.setItem('currentUser', user.currentUser)
      localStorage.setItem('token', user.token)
      setToken(user.token)
      setCurrentUser(user.currentUser)
      navigate('/')
    } catch (e) {
      console.log(e)
      setError(e)
    }
  }

  const editUser = async (data) => {
    try {
      const user = await JoblyApi.editUser(data, currentUser)
      return user
    } catch (err) {
      console.log(err)
      setError(err)
    }
  }

  const logout = () => {
    JoblyApi.logoutUser()
    localStorage.clear()
    setToken(() => '')
    setCurrentUser(() => '')
    navigate('/')
  }

  // function passed in outlet context, used in JobCard component
  const applyToJob = async (jobId) => {
    try {
      const res = await JoblyApi.applyToJob(currentUser, jobId)
      setApplications((prevApplications) => new Set(prevApplications).add(res.applied))
    } catch (err) {
      if (err[0] === 'duplicate key value violates unique constraint "applications_pkey"') {
        setApplications((prevApplications) => new Set(prevApplications).add(jobId))
      }
    }
  }

  return (
    <div className="App">
      {/* Navbar will always render */}
      <NavBar currentUser={currentUser} logout={logout} />
      {/* outlet allows child elements from child routes to render
        and provides context available to all children */}
      {message && <p>{message}</p>}
      <Outlet context={{
        token, currentUser, setCurrentUser,
        applyToJob, applications, login,
        register, editUser, error, setError, setMessage
      }} />
    </div>
  );
}

export default App;