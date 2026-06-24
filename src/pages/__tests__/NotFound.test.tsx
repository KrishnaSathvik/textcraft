import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import NotFound from '../NotFound'

describe('NotFound', () => {
  it('renders correctly', () => {
    render(<NotFound />)

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page not found')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })

  it('has a link to go back home', () => {
    render(<NotFound />)

    const homeLink = screen.getByRole('link', { name: /back to home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('displays the correct status code', () => {
    render(<NotFound />)

    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('has proper heading structure', () => {
    render(<NotFound />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Page not found')
  })

  it('includes helpful description text and popular tools', () => {
    render(<NotFound />)

    expect(screen.getByText(/could not find/i)).toBeInTheDocument()
    expect(screen.getByText('Popular tools')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Word Counter' })).toBeInTheDocument()
  })
})
