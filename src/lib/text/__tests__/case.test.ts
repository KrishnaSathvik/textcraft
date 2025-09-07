import { describe, it, expect } from 'vitest'
import { 
  toCamelCase, 
  toSnakeCase, 
  toKebabCase, 
  toUpper, 
  toTitleCase, 
  toSentenceCase,
  capitalizeWords,
  transformCase
} from '../case'
import { sampleTexts } from '../../../test/testData'

describe('Case Conversion', () => {
  const testString = 'hello world test'

  describe('toCamelCase', () => {
    it('converts to camelCase correctly', () => {
      expect(toCamelCase(testString)).toBe('helloWorldTest')
      expect(toCamelCase('hello')).toBe('hello')
      expect(toCamelCase('HELLO WORLD')).toBe('helloWorld')
    })

    it('handles empty string', () => {
      expect(toCamelCase('')).toBe('')
    })

    it('handles single word', () => {
      expect(toCamelCase('hello')).toBe('hello')
    })

    it('handles special characters', () => {
      expect(toCamelCase('hello-world_test')).toBe('helloWorldTest')
    })
  })

  describe('capitalizeWords', () => {
    it('converts to Capitalize Words correctly', () => {
      expect(capitalizeWords(testString)).toBe('Hello World Test')
      expect(capitalizeWords('hello')).toBe('Hello')
      expect(capitalizeWords('HELLO WORLD')).toBe('HELLO WORLD')
    })

    it('handles empty string', () => {
      expect(capitalizeWords('')).toBe('')
    })
  })

  describe('toSnakeCase', () => {
    it('converts to snake_case correctly', () => {
      expect(toSnakeCase(testString)).toBe('hello_world_test')
      expect(toSnakeCase('hello')).toBe('hello')
      expect(toSnakeCase('HELLO WORLD')).toBe('hello_world')
    })

    it('handles empty string', () => {
      expect(toSnakeCase('')).toBe('')
    })

    it('handles special characters', () => {
      expect(toSnakeCase('hello-world_test')).toBe('hello_world_test')
    })
  })

  describe('toKebabCase', () => {
    it('converts to kebab-case correctly', () => {
      expect(toKebabCase(testString)).toBe('hello-world-test')
      expect(toKebabCase('hello')).toBe('hello')
      expect(toKebabCase('HELLO WORLD')).toBe('hello-world')
    })

    it('handles empty string', () => {
      expect(toKebabCase('')).toBe('')
    })

    it('handles special characters', () => {
      expect(toKebabCase('hello_world-test')).toBe('hello-world-test')
    })
  })

  describe('toUpper', () => {
    it('converts to UPPERCASE correctly', () => {
      expect(toUpper(testString)).toBe('HELLO WORLD TEST')
      expect(toUpper('hello')).toBe('HELLO')
      expect(toUpper('hello world')).toBe('HELLO WORLD')
    })

    it('handles empty string', () => {
      expect(toUpper('')).toBe('')
    })
  })

  describe('toTitleCase', () => {
    it('converts to Title Case correctly', () => {
      expect(toTitleCase(testString)).toBe('Hello World Test')
      expect(toTitleCase('hello')).toBe('Hello')
      expect(toTitleCase('HELLO WORLD')).toBe('Hello World')
    })

    it('handles empty string', () => {
      expect(toTitleCase('')).toBe('')
    })

    it('handles special characters', () => {
      expect(toTitleCase('hello-world_test')).toBe('Hello-World_Test')
    })
  })

  describe('toSentenceCase', () => {
    it('converts to sentence case correctly', () => {
      expect(toSentenceCase(testString)).toBe('Hello world test')
      expect(toSentenceCase('hello')).toBe('Hello')
      expect(toSentenceCase('HELLO WORLD')).toBe('Hello world')
    })

    it('handles empty string', () => {
      expect(toSentenceCase('')).toBe('')
    })

    it('handles special characters', () => {
      expect(toSentenceCase('hello-world_test')).toBe('Hello-world_test')
    })
  })

  describe('Edge cases', () => {
    it('handles numbers in text', () => {
      expect(toCamelCase('hello 123 world')).toBe('hello123World')
      expect(toSnakeCase('hello 123 world')).toBe('hello_123_world')
    })

    it('handles multiple spaces', () => {
      expect(toCamelCase('hello    world')).toBe('helloWorld')
      expect(toSnakeCase('hello    world')).toBe('hello_world')
    })

    it('handles leading/trailing spaces', () => {
      expect(toCamelCase('  hello world  ')).toBe('helloWorld ')
      expect(toSnakeCase('  hello world  ')).toBe('_hello_world_')
    })

    it('handles unicode characters', () => {
      expect(toCamelCase('hello 世界 world')).toBe('hello世界World')
      expect(toSnakeCase('hello 世界 world')).toBe('hello_世界_world')
    })
  })
})
