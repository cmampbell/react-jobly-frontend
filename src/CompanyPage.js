import React from 'react';
import { useLoaderData } from 'react-router-dom';

import JobCard from './JobCard';

const CompanyPage = () => {
    const company = useLoaderData()
    return (
        <div className='CompanyPage'>
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            {company.jobs.map((job) => <JobCard job={job} key={job.id}/>)}
        </div>
    )
}

export default CompanyPage;