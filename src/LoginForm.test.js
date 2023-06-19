import { render } from '@testing-library/react';
import LoginForm from './LoginForm';
import { RouterProvider, createMemoryRouter} from 'react-router-dom';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useOutletContext: function () {
        return {
            login: () => null,
            error: null,
            setError: ()=> null
        }
    }
})
);

const route = [
    {
      path: "/",
      element: <LoginForm />,
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
        expect(await findByText('Login')).toBeInTheDocument()
    })
})