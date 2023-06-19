import React from 'react'
import { Route, createRoutesFromElements, redirect } from 'react-router-dom'

import JoblyApi from './api'
import { useSearchParams } from './useSearchParams';

import App from './App';
import ErrorBoundary from './ErrorBoundary';

import Home from './Home'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import ResultsPage from './ResultsPage'
import CompanyPage from './CompanyPage';
import UserProfile from './UserProfile';

const testCompanies = [
    {
    handle: 'test1',
    name: 'Name1',
    numEmployees: 45,
    description: 'Test company 1',
    jobs: [
        {id: 1, title: 'test1', companyName: 'test', salary: '50000', equity: '.03'},
        {id: 2, title: 'test2', companyName: 'test2', salary: '500', equity: '.05'}]
},
{
    handle: 'test2',
    name: 'Name2',
    numEmployees: 2,
    description: 'Test company 2'
}, 
{
    handle: 'test3',
    name: 'Name3',
    numEmployees: 101,
    description: 'Test company 3'
}, 
]
const testJobs = [
    {id: 1, title: 'test1', companyName: 'test', salary: '50000', equity: '.03'},
    {id: 2, title: 'test2', companyName: 'test2', salary: '500', equity: '.05'}
]

const testUser = {
    username: 'test',
    firstName: 'testFN',
    lastName: 'testLN',
    email: 'test@test.com'
}

const TestRoutes = createRoutesFromElements(
    <>
        <Route element={<App />}
            errorElement={<ErrorBoundary />}
        >
            <Route path='/' element={<Home />} />
            <Route
                path='/companies'
                element={<ResultsPage path='companies' />}
                loader={({ request }) => {
                    return testCompanies
                }
                }
            />
            <Route
                path='/companies/:id'
                element={<CompanyPage />}
                loader={({ params }) => {
                    return testCompanies[params.id]
                }}
            />
            <Route path='/jobs'
                element={<ResultsPage path='jobs' />}
                loader={() => {
                    return testJobs
                }}
            />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignUpForm />} />
            <Route
                path='/users/:username'
                element={<UserProfile />}
                loader={async ({ params: { username } }) => {
                    return testUser
                }}
            />
        </Route >
    </>
)

export default TestRoutes;