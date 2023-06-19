import { render } from '@testing-library/react';
import SearchBar from './SearchBar';
import { RouterProvider, createMemoryRouter} from 'react-router-dom';

const route = [
    {
      path: "/",
      element: <SearchBar path={'companies'} />,
    },
  ];

  const router = createMemoryRouter(route);

describe('Smoke and snapshot CompanyCard test', () => {
    it('should render without crashing', () => {
        render(<RouterProvider router={router}/>);
    });
    it('should match snapshot', ()=> {
        const { asFragment } = render(<RouterProvider router={router}/>);
        expect(asFragment()).toMatchSnapshot();
    })
})