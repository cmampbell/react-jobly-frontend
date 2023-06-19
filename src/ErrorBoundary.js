import React from 'react';
import { useRouteError, useLocation } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError()
    const location = useLocation()

    console.log(error)
    console.log(location)
    return (
        <>
            <h1>{error.message}</h1>
        </>
    )
}

export default ErrorBoundary;