# Testing Directory

This directory contains testing utilities, setup files, and test data for the TextCraft application.

## Files

- `setup.ts` - Global test setup and mocks
- `utils.tsx` - Custom testing utilities and render helpers
- `testData.ts` - Shared test data and mock objects
- `README.md` - This file

## Usage

### Custom Render Function

Use the custom render function from `utils.tsx` to render components with all necessary providers:

```tsx
import { render, screen } from '../test/utils'
import { MyComponent } from './MyComponent'

test('renders component', () => {
  render(<MyComponent />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
```

### Test Data

Import test data from `testData.ts` for consistent testing:

```tsx
import { sampleTexts, expectedCounts } from '../test/testData'

test('counts words correctly', () => {
  expect(countWords(sampleTexts.short)).toBe(expectedCounts.short.words)
})
```

### Mocks

Common mocks are automatically set up in `setup.ts`:
- `matchMedia` for responsive components
- `localStorage` and `sessionStorage`
- `navigator.clipboard`
- `ResizeObserver` and `IntersectionObserver`
- Console methods (with warnings filtered)

## Adding New Tests

1. Create test files in `__tests__` folders next to the components they test
2. Use the custom render function for React components
3. Import test data from `testData.ts` when needed
4. Follow the testing patterns established in existing tests

## Test Structure

```
src/
├── components/
│   ├── __tests__/
│   │   ├── ComponentName.test.tsx
│   │   └── ui/
│   │       └── Button.test.tsx
├── pages/
│   ├── __tests__/
│   │   ├── PageName.test.tsx
│   │   └── tools/
│   │       └── ToolName.test.tsx
├── lib/
│   ├── __tests__/
│   │   ├── utils.test.ts
│   │   └── text/
│   │       └── functionName.test.ts
├── hooks/
│   └── __tests__/
│       └── hookName.test.tsx
└── test/
    ├── setup.ts
    ├── utils.tsx
    ├── testData.ts
    └── README.md
```
