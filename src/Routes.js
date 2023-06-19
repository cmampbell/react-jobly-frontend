import React from 'react'
import { Route, createRoutesFromElements, redirect } from 'react-router-dom'

import JoblyApi from './api'
import {useSearchParams} from './useSearchParams';

import App from './App';
import ErrorBoundary from './ErrorBoundary';

import Home from './Home'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import ResultsPage from './ResultsPage'
import CompanyPage from './CompanyPage';
import UserProfile from './UserProfile';

const Routes = createRoutesFromElements(
        <>
            <Route element={<App/>}
                errorElement={<ErrorBoundary />}
            >
                <Route path='/' element={<Home/>} />
                <Route 
                    path='/companies'
                    element={<ResultsPage path='companies' />} 
                    loader={({request}) =>{
                        if (!JoblyApi.token) return redirect('/')
                        const searchParams = useSearchParams(request)
                        let result = searchParams ?  JoblyApi.getFilteredCompanies(searchParams)
                                        : JoblyApi.getAllCompanies()
                        return result
                        }
                    }
                />
                <Route 
                    path='/companies/:id' 
                    element={<CompanyPage />} 
                    loader={({params}) => {
                        if (!JoblyApi.token) return redirect('/')
                        return JoblyApi.getCompany(params.id)
                    }} 
                />
                <Route path='/jobs' 
                    element={<ResultsPage path='jobs' />} 
                    loader={({request}) =>{
                        if (!JoblyApi.token) return redirect('/')
                        const searchParams = useSearchParams(request)
                        let result = searchParams ? JoblyApi.getFilteredJobs(searchParams)
                                        : JoblyApi.getAllJobs()
                        return result
                        }}
                />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/signup'element={<SignUpForm/>} />
                <Route 
                    path='/users/:username' 
                    element={<UserProfile />} 
                    loader={async ({params: {username}})=> {
                        if (!JoblyApi.token) return redirect('/')
                        const user = await JoblyApi.getUser(username)
                        return user
                    }}
                />
            </Route >
        </>
    )

export default Routes;