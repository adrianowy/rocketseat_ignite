import {render, screen} from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { SignInButton } from './'

jest.mock('next-auth/client')

describe('SignInButton Component', () => {
    it('renders correctly when user is not authenticated', () => {
        
        const useSessionMocked = jest.mocked(useSession)
        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SignInButton />)

        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('renders correctly when user is authenticated', () => {

        const useSessionMocked = jest.mocked(useSession)
        useSessionMocked.mockReturnValueOnce([
            { user: {name: 'Jhon Doe', email: 'jhon.doe@example.com'}, expires: 'fake' }
            , false
        ])

        render(<SignInButton />)
        
        expect(screen.getByText('Jhon Doe')).toBeInTheDocument()
    })
    
})