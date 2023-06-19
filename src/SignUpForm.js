import React, { useState } from 'react'
import { Form, useOutletContext } from 'react-router-dom'

const SignUpForm = () => {
    const { register } = useOutletContext()
    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData(() => ({
            ...formData, [name]: value }
        ))
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        register(formData);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input 
                placeholder='username'
                name="username" 
                id="username" 
                type="text" 
                value={formData.username}
                onChange={handleChange}/>
            <label htmlFor='password'>Password:</label>
            <input 
                placeholder='password'
                name="password"
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}/>
            <label htmlFor='firstName'>First name:</label>
            <input 
                placeholder='first name'
                name="firstName" 
                id="firstName" 
                type="text" 
                value={formData.firstName}
                onChange={handleChange}/>
            <label htmlFor='lastName'>Last name:</label>
            <input 
                placeholder='last name'
                name="lastName" 
                id="lastName" 
                type="text" 
                value={formData.lastName}
                onChange={handleChange}/>
            <label htmlFor='email'>Email:</label>
            <input 
                placeholder='email'
                name="email" 
                id="email" 
                type="text" 
                value={formData.email}
                onChange={handleChange}/>
            <button type="submit">Sign Up!</button>
        </Form>
    )
}

export default SignUpForm;