import { render } from '@testing-library/react';
import SignUpForm from './SignUpForm';
import { RouterProvider, createMemoryRouter} from 'react-router-dom';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useOutletContext: function () {
        return {
            register: () => console.log('registered')
        }
    }
})
);

const route = [
    {
      path: "/",
      element: <SignUpForm />,
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
        expect(await findByText('Sign Up!')).toBeInTheDocument()
    })
})