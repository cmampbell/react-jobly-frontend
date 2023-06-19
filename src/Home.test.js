import React from 'react'
import { render } from '@testing-library/react';
import Home from './Home'
import { MemoryRouter } from 'react-router-dom';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useOutletContext: function () {
        return {
            currentUser: 'test'
        }
    }
})
);

describe('Smoke and snapshot tests for Home.js', () => {
    it('should render without crashing', () => {
        render(<Home />, {wrapper: MemoryRouter})
    })

    it('should match snapshot', async () => {
        const { asFragment, findByText } = render(<Home />, {wrapper:MemoryRouter})
        expect(asFragment()).toMatchSnapshot();
        expect(await findByText('Welcome back test')).toBeInTheDocument()
      })
})