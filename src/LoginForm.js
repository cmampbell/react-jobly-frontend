import React, { useState, useEffect } from 'react';
import { Form, useOutletContext } from 'react-router-dom';

const LoginForm = () => {
    const INITIAL_STATE = { username: '', password: '' };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { login, error, setError } = useOutletContext()

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData(() => ({
            ...formData, [name]: value
        }
        ))
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        login(formData)
    }

    // if user navigates away from login screen, clear error
    useEffect(() => () => setError(() => null), [setError])

    return (
        <Form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input
                placeholder='username'
                name="username"
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange} />
            <label htmlFor='password'>Password:</label>
            <input
                placeholder='password'
                name="password"
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange} />
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </Form>
    )
}

export default LoginForm;