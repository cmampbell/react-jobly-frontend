import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Button} from 'reactstrap';

const JobCard = ({job}) => {
    // applications is a set of job.id that user has applied to, saved in state on <App />
    const { applyToJob, applications } = useOutletContext()
    return (
        <Card className="text-start" color="info" outline style={{ width: '80vw' }}>
            <CardBody>
                <CardTitle tag="h5">
                    {job.title} at {job.companyName}
                </CardTitle>
                <CardText>
                    Salary: {job.salary}
                </CardText>
                <CardText>
                    Equity: {job.equity ? job.equity : 'None'}
                </CardText>
                {/* if the job id is in application, show application submitted button */}
                {!applications.has(job.id)  ? 
                <Button onClick={() => applyToJob(job.id)}> Submit Application! </Button>
                : <Button>Application Submitted!</Button>
            }
            </CardBody>
        </Card>
    )
}

export default JobCard;