import { render } from '@testing-library/react';
import UserProfile from './UserProfile';
import { RouterProvider, createMemoryRouter} from 'react-router-dom';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useOutletContext: function () {
        return {
            editUser: () => null,
            error: null,
            setError: ()=> null,
            setMessage: ()=> null
        }
    }
})
);

const testUser = {
    username: 'test',
    firstName: 'testFN',
    lastName: 'testLN',
    email: 'test@test.com'
}

const route = [
    {
      path: "/",
      element: <UserProfile />,
      loader: () => testUser
    },
  ];

const router = createMemoryRouter(route);

describe('Smoke and snapshot CompanyCard test', () => {
    it('should render without crashing', () => {
        render(<RouterProvider router={router}/>);
    });
    it('should match snapshot', async ()=> {
        const { asFragment, findByText } = render(<RouterProvider router={router}/>);
        expect(asFragment()).toMatchSnapshot();
        expect(await findByText('Edit test!')).toBeInTheDocument()
    })
})