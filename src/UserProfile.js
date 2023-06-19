import React, { useState, useEffect } from 'react';
import { useLoaderData, Form, useOutletContext } from 'react-router-dom';

const UserProfile = () => {
    const user = useLoaderData();
    const { editUser, error, setError, setMessage } = useOutletContext()
    const INITIAL_STATE = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };
    const [formData, setFormData] = useState(INITIAL_STATE);


    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData(() => ({
            ...formData, [name]: value
        }
        ))
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const user = editUser(formData)
        setMessage(`Update successful for ${user.username}`)
    }

    // clear error and message after component unmounts
    useEffect(() => () => {
        setMessage('')
        setError('')
    }, [setError, setMessage])

    return (
        <Form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input
                name="username"
                id="username"
                type="text"
                readOnly
                value={formData.username}
                onChange={handleChange} />
            <label htmlFor='firstName'>First name:</label>
            <input
                name="firstName"
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange} />
            <label htmlFor='lastName'>Last name:</label>
            <input
                name="lastName"
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange} />
            <label htmlFor='email'>Email:</label>
            <input
                name="email"
                id="email"
                type="text"
                value={formData.email}
                onChange={handleChange} />
            {error && <p>Unable to Update{error.message}</p>}
            <button type="submit">Edit {user.username}!</button>
        </Form>
    )
}

export default UserProfile;