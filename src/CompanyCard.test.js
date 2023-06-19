import { render } from '@testing-library/react';
import CompanyCard from './CompanyCard';
import { MemoryRouter } from 'react-router-dom';

describe('Smoke and snapshot CompanyCard test', () => {
    it('should render without crashing', () => {
        render(<CompanyCard company={{ 
                            handle: 'test', 
                            name: 'Name', 
                            numEmployees: 45, 
                            description: 'Test company' }}/>,
                            {wrapper: MemoryRouter});
    });
    it('should match snapshot', ()=> {
        const { asFragment } = render(<CompanyCard company={{ 
                                        handle: 'test', 
                                        name: 'Name', 
                                        numEmployees: 45, 
                                        description: 'Test company' }}/>, 
                                        {wrapper: MemoryRouter})
        expect(asFragment()).toMatchSnapshot();
    })
})