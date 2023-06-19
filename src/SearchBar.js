import React, { useState } from 'react';
import { Form } from 'react-router-dom';

const SearchBar = ({path}) => {
    const INITIAL_STATE = '';
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (evt) => {
        setFormData(() => evt.target.value)
    }

    return (
        <Form method="get" action={`/${path}`} onSubmit={(()=> setFormData(INITIAL_STATE))}>
            {path === 'companies' ? 
                        <input id="name" name="name" onChange={handleChange} value={formData} type='text'/>
                        : <input id="title" name="title" onChange={handleChange} value={formData} type='text'/>}
            <button type="submit">Search {path}</button>
        </Form>
    )
}

export default SearchBar;