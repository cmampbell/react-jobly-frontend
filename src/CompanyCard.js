import React from 'react';
import { Card, CardBody, CardTitle, CardText} from 'reactstrap';
import { Link } from 'react-router-dom'

const CompanyCard = ({ company }) => {
    return (
        <Link to={`/companies/${company.handle}`}>
        <Card className="text-start" color="info" outline style={{ width: '80vw' }}>
            <CardBody>
                <CardTitle tag="h5">
                    {company.name}
                </CardTitle>
                <CardText>
                    Desc: {company.description}
                </CardText>
                <CardText>
                    Size: {company.numEmployees} employees
                </CardText>
            </CardBody>
        </Card>
        </Link>
    )
}

export default CompanyCard;