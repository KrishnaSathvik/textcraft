import { describe, it, expect } from 'vitest'
import { countStats, formatReadingTime } from '../counters'
import { sampleTexts } from '../../../test/testData'

describe('Text Counters', () => {
  describe('countStats', () => {
    it('counts stats correctly for normal text', () => {
      const stats = countStats(sampleTexts.short)
      expect(stats.words).toBe(2)
      expect(stats.chars).toBe(11)
      expect(stats.charsNoSpaces).toBe(10)
      expect(stats.lines).toBe(1)
      expect(stats.paragraphs).toBe(1)
    })

    it('handles empty string', () => {
      const stats = countStats(sampleTexts.empty)
      expect(stats.words).toBe(0)
      expect(stats.chars).toBe(0)
      expect(stats.charsNoSpaces).toBe(0)
      expect(stats.lines).toBe(0)
      expect(stats.paragraphs).toBe(0)
    })

    it('handles whitespace only', () => {
      const stats = countStats(sampleTexts.whitespace)
      expect(stats.words).toBe(0)
      expect(stats.chars).toBe(7)
      expect(stats.charsNoSpaces).toBe(0)
      expect(stats.lines).toBe(2)
      expect(stats.paragraphs).toBe(0)
    })

    it('handles text with newlines', () => {
      const stats = countStats(sampleTexts.withNewlines)
      expect(stats.words).toBe(6)
      expect(stats.chars).toBe(20)
      expect(stats.charsNoSpaces).toBe(15)
      expect(stats.lines).toBe(3)
      expect(stats.paragraphs).toBe(1)
    })

    it('handles special characters', () => {
      const stats = countStats(sampleTexts.withSpecialChars)
      expect(stats.words).toBe(4)
      expect(stats.chars).toBe(27)
      expect(stats.charsNoSpaces).toBe(24)
    })

    it('handles unicode text', () => {
      const stats = countStats(sampleTexts.unicode)
      expect(stats.words).toBe(1)
      expect(stats.chars).toBe(11)
      expect(stats.charsNoSpaces).toBe(9)
    })

    it('handles multiple paragraphs', () => {
      const stats = countStats(sampleTexts.multiParagraph)
      expect(stats.words).toBe(6)
      expect(stats.chars).toBe(53)
      expect(stats.charsNoSpaces).toBe(46)
      expect(stats.lines).toBe(5)
      expect(stats.paragraphs).toBe(3)
    })

    it('calculates reading time correctly', () => {
      const stats = countStats(sampleTexts.medium)
      expect(stats.readingTimeMin).toBeGreaterThan(0)
      expect(stats.speakingTimeMin).toBeGreaterThan(0)
    })

    it('handles very long text', () => {
      const stats = countStats(sampleTexts.veryLong)
      expect(stats.words).toBe(1000)
      expect(stats.chars).toBe(5000)
      expect(stats.charsNoSpaces).toBe(4000)
    })

    it('handles text with sentences', () => {
      const textWithSentences = 'Hello world. This is a test! How are you?'
      const stats = countStats(textWithSentences)
      expect(stats.sentences).toBe(3)
    })

    it('handles text without sentence endings', () => {
      const stats = countStats(sampleTexts.short)
      expect(stats.sentences).toBe(1) // Should default to 1 if there are words but no sentence endings
    })
  })

  describe('formatReadingTime', () => {
    it('formats reading time correctly', () => {
      expect(formatReadingTime(0)).toBe('< 1 min')
      expect(formatReadingTime(1)).toBe('1 min')
      expect(formatReadingTime(5)).toBe('5 min')
      expect(formatReadingTime(60)).toBe('1h')
      expect(formatReadingTime(90)).toBe('1h 30m')
      expect(formatReadingTime(120)).toBe('2h')
    })
  })
})