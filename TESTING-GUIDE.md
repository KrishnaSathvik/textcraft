# Testing Guide for TextCraft

This guide covers testing setup and best practices for the TextCraft text processing tools application.

## Overview

TextCraft is a React-based text processing application with multiple tools including word counter, case converter, line breaks remover, text diff checker, and lorem ipsum generator. This testing guide provides comprehensive coverage for all components and utilities.

## What's Included

- **Vitest**: Fast unit testing framework optimized for Vite
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM assertions
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM environment for testing
- **@vitest/coverage-v8**: Code coverage reporting

## Configuration Files

- `vitest.config.ts` - Vitest configuration with React and TypeScript support
- `src/test/setup.ts` - Test setup, mocks, and global configurations
- `src/test/utils.tsx` - Custom testing utilities and render helpers

## Project Structure

```
src/
├── components/
│   ├── __tests__/
│   │   ├── Navigation.test.tsx
│   │   ├── ThemeToggle.test.tsx
│   │   └── ui/
│   │       ├── Button.test.tsx
│   │       ├── TextArea.test.tsx
│   │       └── CopyButton.test.tsx
│   └── ...
├── pages/
│   ├── __tests__/
│   │   ├── Index.test.tsx
│   │   ├── About.test.tsx
│   │   └── tools/
│   │       ├── WordCounter.test.tsx
│   │       ├── CaseConverter.test.tsx
│   │       ├── LineBreaks.test.tsx
│   │       ├── DiffChecker.test.tsx
│   │       └── LoremIpsum.test.tsx
│   └── ...
├── lib/
│   ├── __tests__/
│   │   ├── utils.test.ts
│   │   └── text/
│   │       ├── case.test.ts
│   │       ├── counters.test.ts
│   │       ├── cleanup.test.ts
│   │       ├── diff.test.ts
│   │       └── lorem.test.ts
│   └── ...
├── hooks/
│   ├── __tests__/
│   │   ├── useSEO.test.tsx
│   │   ├── useAnalytics.test.tsx
│   │   └── use-mobile.test.tsx
│   └── ...
└── test/
    ├── setup.ts
    └── utils.tsx
```

## Running Tests

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch"
  }
}
```

### Commands

- `npm run test` - Run tests in watch mode (default)
- `npm run test:run` - Run tests once and exit
- `npm run test:ui` - Run with Vitest UI (requires `@vitest/ui`)
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:watch` - Run tests in watch mode (explicit)

## Writing Tests

### Component Testing

Tests are located in `__tests__` folders next to the components they test. Use this pattern:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { WordCounter } from '../WordCounter'

describe('WordCounter', () => {
  it('renders correctly with initial state', () => {
    render(<WordCounter />)
    expect(screen.getByText('Word Counter')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('counts words correctly', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Hello world test')
    
    expect(screen.getByText('Words: 3')).toBeInTheDocument()
    expect(screen.getByText('Characters: 15')).toBeInTheDocument()
  })
})
```

### Utility Function Testing

```tsx
import { describe, it, expect } from 'vitest'
import { countWords, countCharacters } from '../counters'

describe('Text Counters', () => {
  it('counts words correctly', () => {
    expect(countWords('Hello world')).toBe(2)
    expect(countWords('')).toBe(0)
    expect(countWords('   ')).toBe(0)
  })

  it('counts characters correctly', () => {
    expect(countCharacters('Hello')).toBe(5)
    expect(countCharacters('')).toBe(0)
    expect(countCharacters('Hello\nWorld')).toBe(11)
  })
})
```

### Hook Testing

```tsx
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useSEO } from '../useSEO'

describe('useSEO', () => {
  it('updates document title', () => {
    renderHook(() => useSEO({ title: 'Test Page' }))
    expect(document.title).toBe('Test Page | TextCraft')
  })
})
```

## Testing Patterns

### 1. Text Processing Tools

Each text processing tool should be tested for:
- Initial render state
- Input handling
- Output generation
- Edge cases (empty input, special characters)
- Copy/download functionality
- Responsive behavior

### 2. UI Components

Test UI components for:
- Rendering with different props
- User interactions
- Accessibility features
- Theme switching
- Responsive design

### 3. Utility Functions

Test utility functions for:
- Normal cases
- Edge cases
- Error handling
- Type safety

### 4. Hooks

Test custom hooks for:
- State management
- Side effects
- Cleanup
- Dependencies

## Mocks and Setup

Common mocks are set up in `src/test/setup.ts`:

```tsx
// MatchMedia mock for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// LocalStorage mock
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
})

// Clipboard API mock
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
    readText: vi.fn(),
  },
  writable: true,
})
```

## Test Data

Create test data files for consistent testing:

```tsx
// src/test/testData.ts
export const sampleTexts = {
  short: 'Hello world',
  medium: 'This is a medium length text for testing purposes.',
  long: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  withNewlines: 'Line 1\nLine 2\nLine 3',
  withSpecialChars: 'Hello @world! #testing $100',
  empty: '',
  whitespace: '   \n\t  ',
}
```

## Coverage Goals

Aim for the following coverage targets:
- **Statements**: 90%+
- **Branches**: 85%+
- **Functions**: 90%+
- **Lines**: 90%+

## Best Practices

### 1. Test Organization
- Group related tests using `describe` blocks
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

### 2. Component Testing
- Test user interactions, not implementation details
- Use `screen` queries for better accessibility
- Mock external dependencies
- Test error states and loading states

### 3. Utility Testing
- Test edge cases and error conditions
- Use parameterized tests for multiple inputs
- Test type safety with TypeScript

### 4. Performance Testing
- Test with large inputs for text processing tools
- Monitor memory usage in long-running tests
- Use `vi.advanceTimersByTime()` for timer-based tests

## Debugging Tests

### Common Issues

1. **Async operations**: Use `await` and `waitFor` for async operations
2. **DOM updates**: Use `act()` for state updates that trigger DOM changes
3. **Mock cleanup**: Reset mocks between tests using `vi.clearAllMocks()`
4. **Memory leaks**: Clean up event listeners and timers

### Debugging Tools

- Use `screen.debug()` to see current DOM state
- Use `--reporter=verbose` for detailed test output
- Use Vitest UI for interactive debugging
- Use `console.log` in tests (removed in production)

## Continuous Integration

Add to your CI pipeline:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://testing-library.com/docs/guide-which-query)

---

**Happy Testing! 🧪**

For questions or contributions to the testing setup, please refer to the project's contributing guidelines.
