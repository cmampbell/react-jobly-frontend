import {render} from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import { RouterProvider, createMemoryRouter} from 'react-router-dom'
import { act } from 'react-dom/test-utils';
import TestRoutes from './TestRoutes'
import userEvent from '@testing-library/user-event'
import axios from 'axios';

const router = createMemoryRouter(TestRoutes, {initialEntries: ['/']})
jest.mock('axios')

describe('Smoke and snapshot tests for app', ()=> {
    it('should render without crashing', () => {
        render(<RouterProvider router={router}></RouterProvider>)
      })
    it('should match snapshot', () => {
        const { asFragment } = render(<RouterProvider router={router}></RouterProvider>)
        expect(asFragment()).toMatchSnapshot();
      })
});

describe('Testing register', ()=> {
    it('should take user to signup page when clicking signup link', async ()=> {
        const { getByText, getAllByText, getByPlaceholderText } = render(<RouterProvider router={router}></RouterProvider>)

        await act(()=> userEvent.click(getAllByText('Signup')[0]))
        
        expect(getByText('Username:')).toBeInTheDocument()
        expect(getByText('Password:')).toBeInTheDocument()
        expect(getByText('First name:')).toBeInTheDocument()
        expect(getByText('Last name:')).toBeInTheDocument()
        expect(getByText('Email:')).toBeInTheDocument()

        axios.mockResolvedValue({data: {
            token: 'fakeJWT',
            currentUser: 'testuser'
          }})

        await act(async ()=> {
            userEvent.type(getByPlaceholderText('username'), 'testuser')
            userEvent.type(getByPlaceholderText('password'), 'password')
            userEvent.type(getByPlaceholderText('first name'), 'test')
            userEvent.type(getByPlaceholderText('last name'), 'user')
            userEvent.type(getByPlaceholderText('email'), 'test@user.com')
            await userEvent.click(getByText('Sign Up!'))
        })

        expect(await getByText('Welcome back testuser')).toBeInTheDocument()
    })
})
