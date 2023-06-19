import { render } from '@testing-library/react';
import CompanyPage from './CompanyPage';
import { RouterProvider, createMemoryRouter, Route } from 'react-router-dom';

const testCompany = {
  handle: 'test1',
  name: 'Name1',
  numEmployees: 45,
  description: 'Test company 1',
  jobs: [{id: 1, title: 'test1', companyName: 'test', salary: '50000', equity: '.03'},
          {id: 2, title: 'test2', companyName: 'test2', salary: '500', equity: '.05'}]
}


const route = [
  {
    path: "/",
    element: <CompanyPage />,
    loader: ()=> testCompany
  },
];

const router = createMemoryRouter(route)

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: function () {
    return {
      applyToJob: function () {
        return null
      },
      applications: new Set()
    }
  }
})
);

describe('Smoke and snapshot CompanyPage test', () => {
  
  it('should render without crashing', () => {
    render(<RouterProvider router={router}>
        <CompanyPage />
    </RouterProvider>);
  });

  it('should match snapshot', async () => {
    const { asFragment, findByText } = render(<RouterProvider router={router}><CompanyPage /></RouterProvider>)
    expect(asFragment()).toMatchSnapshot();
    expect(await findByText('Name1')).toBeInTheDocument()
  })
})
