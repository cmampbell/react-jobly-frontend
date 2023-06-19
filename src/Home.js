import React from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const { currentUser } = useOutletContext()

    return (
        currentUser ?
            <>
                <h2>Welcome back {currentUser}</h2>
                <Link to="/jobs">Look at jobs</Link>
                <Link to="/companies">Look at companies</Link>
            </>
            :
            <>
                <h2>You must be a user to see jobs and companies</h2>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </>
    )
}

export default Home;