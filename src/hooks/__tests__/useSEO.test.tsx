import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSEO } from '../useSEO'

// Mock document methods
Object.defineProperty(document, 'title', {
  value: '',
  writable: true,
})

describe('useSEO', () => {
  beforeEach(() => {
    document.title = ''
  })

  afterEach(() => {
    // Clean up any meta tags that might have been added
    const metaTags = document.querySelectorAll('meta[data-testid]')
    metaTags.forEach(tag => tag.remove())
  })

  it('updates document title correctly', () => {
    renderHook(() => useSEO({ title: 'Test Page' }))
    
    expect(document.title).toBe('Test Page | TextCraft')
  })

  it('handles title that already includes site name', () => {
    renderHook(() => useSEO({ title: 'Test Page | TextCraft' }))
    
    expect(document.title).toBe('Test Page | TextCraft')
  })

  it('handles empty title', () => {
    renderHook(() => useSEO({ title: '' }))
    
    expect(document.title).toBe(' | TextCraft')
  })

  it('handles undefined title', () => {
    renderHook(() => useSEO({}))
    
    expect(document.title).toBe(' | TextCraft')
  })

  it('uses default values when not provided', () => {
    renderHook(() => useSEO({ title: 'Test Page' }))
    
    expect(document.title).toBe('Test Page | TextCraft')
  })

  it('handles multiple calls with different values', () => {
    const { rerender } = renderHook(
      ({ title }) => useSEO({ title }),
      { initialProps: { title: 'First Page' } }
    )
    
    expect(document.title).toBe('First Page | TextCraft')
    
    rerender({ title: 'Second Page' })
    
    expect(document.title).toBe('Second Page | TextCraft')
  })

  it('handles complex structured data', () => {
    const complexStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'TextCraft',
      'description': 'Text processing tools',
      'url': 'https://www.textcraft.dev',
      'applicationCategory': 'Text Processing Tools',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    }

    renderHook(() => useSEO({ 
      title: 'Test Page',
      structuredData: complexStructuredData
    }))
    
    expect(document.title).toBe('Test Page | TextCraft')
  })
})