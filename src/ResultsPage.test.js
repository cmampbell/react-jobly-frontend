import { render } from '@testing-library/react';
import ResultsPage from './ResultsPage';
import { RouterProvider, createMemoryRouter, Route } from 'react-router-dom';

const testCompanies = [
    {
    handle: 'test1',
    name: 'Name1',
    numEmployees: 45,
    description: 'Test company 1',
    jobs: [{id: 1, title: 'test1', companyName: 'test', salary: '50000', equity: '.03'},
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

const route = [
    {
      path: "/",
      element: <ResultsPage path={'companies'} />,
      loader: ()=> testCompanies
    },
  ];


const router = createMemoryRouter(route)

describe('Smoke and snapshot CompanyPage test', () => {
  it('should render without crashing', () => {
    render(<RouterProvider router={router}>
      <ResultsPage path={'companies'}/>
    </RouterProvider>);
  });

  it('should match snapshot', async () => {
    const { asFragment, findByText } = render(<RouterProvider router={router}><ResultsPage path={'companies'}/></RouterProvider>)
    expect(asFragment()).toMatchSnapshot();
    expect(await findByText('Name1')).toBeInTheDocument()
  })
})
