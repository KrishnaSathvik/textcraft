import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../components/ThemeProvider'

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="textcraft-theme">
        {children}
      </ThemeProvider>
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Test data for consistent testing
export const testData = {
  sampleTexts: {
    short: 'Hello world',
    medium: 'This is a medium length text for testing purposes.',
    long: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    withNewlines: 'Line 1\nLine 2\nLine 3',
    withSpecialChars: 'Hello @world! #testing $100',
    empty: '',
    whitespace: '   \n\t  ',
    unicode: 'Hello 世界 🌍',
    html: '<p>Hello <strong>world</strong></p>',
    json: '{"name": "test", "value": 123}',
  },
  
  expectedCounts: {
    short: { words: 2, characters: 11, charactersNoSpaces: 10, lines: 1, paragraphs: 1 },
    medium: { words: 8, characters: 50, charactersNoSpaces: 42, lines: 1, paragraphs: 1 },
    long: { words: 19, characters: 120, charactersNoSpaces: 100, lines: 1, paragraphs: 1 },
    withNewlines: { words: 3, characters: 20, charactersNoSpaces: 17, lines: 3, paragraphs: 1 },
    empty: { words: 0, characters: 0, charactersNoSpaces: 0, lines: 1, paragraphs: 0 },
    whitespace: { words: 0, characters: 6, charactersNoSpaces: 0, lines: 2, paragraphs: 0 },
  },

  caseConversions: {
    camelCase: 'helloWorld',
    PascalCase: 'HelloWorld',
    snake_case: 'hello_world',
    'kebab-case': 'hello-world',
    UPPER_CASE: 'HELLO_WORLD',
    'Title Case': 'Hello World',
    'sentence case': 'Hello world',
  },

  loremIpsum: {
    short: 'Lorem ipsum dolor sit amet.',
    medium: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    long: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
}

// Helper functions for common test scenarios
export const testHelpers = {
  // Simulate typing in a textarea
  async typeInTextarea(textarea: HTMLElement, text: string) {
    const { userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    await user.clear(textarea)
    await user.type(textarea, text)
  },

  // Wait for async operations to complete
  async waitForAsync() {
    await new Promise(resolve => setTimeout(resolve, 0))
  },

  // Mock clipboard operations
  mockClipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(''),
  },

  // Mock file download
  mockDownload: vi.fn(),

  // Mock analytics
  mockAnalytics: {
    track: vi.fn(),
    page: vi.fn(),
  },
}

// Import vi for mocking
import { vi } from 'vitest'
