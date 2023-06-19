import React from 'react'
import { useLoaderData } from 'react-router-dom';
import './ResultsPage.css'

import SearchBar from './SearchBar'
import CompanyCard from './CompanyCard';
import JobCard from './JobCard';

// path should be either 'companies' or 'jobs'
const ResultsPage = ({path}) => {
    let results = useLoaderData();

    return (
        <div className="ResultsPage">
            <SearchBar path={path}/>
            {results.length > 0 ? results.map(result => path === 'companies' ?
                                        <CompanyCard company={result} key={result.handle}/>
                                        : <JobCard job ={result} key={result.id}/>)
                                : <p>No matching results.</p> }
        </div>
    )
}

export default ResultsPage;