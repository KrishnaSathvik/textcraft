// Test data for consistent testing across all test files

export const sampleTexts = {
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
  multiParagraph: 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.',
  veryLong: 'word '.repeat(1000), // 1000 words
}

export const expectedCounts = {
  short: { 
    words: 2, 
    characters: 11, 
    charactersNoSpaces: 10, 
    lines: 1, 
    paragraphs: 1 
  },
  medium: { 
    words: 8, 
    characters: 50, 
    charactersNoSpaces: 42, 
    lines: 1, 
    paragraphs: 1 
  },
  long: { 
    words: 19, 
    characters: 120, 
    charactersNoSpaces: 100, 
    lines: 1, 
    paragraphs: 1 
  },
  withNewlines: { 
    words: 3, 
    characters: 20, 
    charactersNoSpaces: 17, 
    lines: 3, 
    paragraphs: 1 
  },
  empty: { 
    words: 0, 
    characters: 0, 
    charactersNoSpaces: 0, 
    lines: 1, 
    paragraphs: 0 
  },
  whitespace: { 
    words: 0, 
    characters: 6, 
    charactersNoSpaces: 0, 
    lines: 2, 
    paragraphs: 0 
  },
  multiParagraph: {
    words: 6,
    characters: 40,
    charactersNoSpaces: 35,
    lines: 5,
    paragraphs: 3,
  },
  veryLong: {
    words: 1000,
    characters: 4999, // 1000 * 5 - 1
    charactersNoSpaces: 4000, // 1000 * 4
    lines: 1,
    paragraphs: 1,
  },
}

export const caseConversions = {
  camelCase: 'helloWorld',
  PascalCase: 'HelloWorld',
  snake_case: 'hello_world',
  'kebab-case': 'hello-world',
  UPPER_CASE: 'HELLO_WORLD',
  'Title Case': 'Hello World',
  'sentence case': 'Hello world',
}

export const loremIpsum = {
  short: 'Lorem ipsum dolor sit amet.',
  medium: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  long: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  word: 'Lorem',
}

export const testUrls = {
  home: 'https://www.textcraft.dev',
  wordCounter: 'https://www.textcraft.dev/word-counter',
  caseConverter: 'https://www.textcraft.dev/case-converter',
  lineBreaks: 'https://www.textcraft.dev/line-breaks',
  diffChecker: 'https://www.textcraft.dev/diff-checker',
  loremIpsum: 'https://www.textcraft.dev/lorem-ipsum',
  about: 'https://www.textcraft.dev/about',
  faq: 'https://www.textcraft.dev/faq',
  privacy: 'https://www.textcraft.dev/privacy',
  terms: 'https://www.textcraft.dev/terms',
  blog: 'https://www.textcraft.dev/blog',
  comparisons: 'https://www.textcraft.dev/comparisons',
}

export const mockUser = {
  email: 'test@example.com',
  name: 'Test User',
  id: 'test-user-123',
}

export const mockAnalytics = {
  track: vi.fn(),
  page: vi.fn(),
  identify: vi.fn(),
  reset: vi.fn(),
}

export const mockClipboard = {
  writeText: vi.fn().mockResolvedValue(undefined),
  readText: vi.fn().mockResolvedValue(''),
}

export const mockFile = {
  name: 'test.txt',
  content: 'Hello world',
  type: 'text/plain',
  size: 11,
}

// Import vi for mocking
import { vi } from 'vitest'
