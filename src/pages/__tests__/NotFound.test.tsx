import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import NotFound from '../NotFound'

describe('NotFound', () => {
  it('renders correctly', () => {
    render(<NotFound />)
    
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Oops! Page not found')).toBeInTheDocument()
    expect(screen.getByText('Return to Home')).toBeInTheDocument()
  })

  it('has a link to go back home', () => {
    render(<NotFound />)
    
    const homeLink = screen.getByRole('link', { name: /return to home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('displays the correct status code', () => {
    render(<NotFound />)
    
    const statusCode = screen.getByText('404')
    expect(statusCode).toBeInTheDocument()
    expect(statusCode).toHaveClass('text-4xl', 'font-bold', 'mb-4')
  })

  it('has proper heading structure', () => {
    render(<NotFound />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('404')
  })

  it('includes helpful description text', () => {
    render(<NotFound />)
    
    expect(screen.getByText('Oops! Page not found')).toBeInTheDocument()
    expect(screen.getByText('Return to Home')).toBeInTheDocument()
  })
})
