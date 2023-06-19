import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({ logout, currentUser }) => {
    return <>
        <div className='NavBar'>
            <NavLink to='/' className='NavBar-Home'>Jobly</NavLink>
            {currentUser ?
                <>
                    <NavLink className='nav-item' to='/jobs' relative='route'>Jobs</NavLink>
                    <NavLink to='/companies'>Companies</NavLink>
                    <NavLink to={`/users/${currentUser}`}>Profile</NavLink>
                    <button onClick={logout}>Logout {currentUser}</button>
                </>
                :
                <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/signup'>Signup</NavLink>
                </>
            }
        </div>
    </>
}

export default NavBar;