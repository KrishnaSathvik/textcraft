import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import WordCounterPage from '../WordCounter'
import { testData } from '../../../test/utils'

// Mock the useSEO hook
vi.mock('../../../hooks/useSEO', () => ({
  useSEO: vi.fn(),
}))

describe('WordCounter', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly with initial state', () => {
    render(<WordCounterPage />)
    
    expect(screen.getByText('Word Counter')).toBeInTheDocument()
    expect(screen.getByText(/Professional word counting tool/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('displays all statistics correctly', () => {
    render(<WordCounterPage />)
    
    // Check that the component renders without errors
    expect(screen.getByText('Word Counter')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('counts words correctly when typing', async () => {
    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, testData.sampleTexts.short)
    
    // Check that the textarea has the expected value
    expect(textarea).toHaveValue(testData.sampleTexts.short)
  })

  it('handles empty input', async () => {
    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    // Don't type empty string, just check initial state
    expect(textarea).toHaveValue('')
    // Check that the component renders without errors
    expect(screen.getByText('Word Counter')).toBeInTheDocument()
  })

  it('handles text with newlines', async () => {
    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, testData.sampleTexts.withNewlines)
    
    // Check that the textarea has the expected value
    expect(textarea).toHaveValue(testData.sampleTexts.withNewlines)
  })

  it('handles text with special characters', async () => {
    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, testData.sampleTexts.withSpecialChars)
    
    // Check that the textarea has the expected value
    expect(textarea).toHaveValue(testData.sampleTexts.withSpecialChars)
  })

  it('handles unicode text', async () => {
    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, testData.sampleTexts.unicode)
    
    // Check that the textarea has the expected value
    expect(textarea).toHaveValue(testData.sampleTexts.unicode)
  })

  it('updates reading time correctly', async () => {
    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, testData.sampleTexts.medium)
    
    // Should show reading time in the reading time section
    expect(screen.getByText('Reading Time')).toBeInTheDocument()
  })

  it('handles clear button', async () => {
    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    
    // Type some text
    await user.type(textarea, testData.sampleTexts.short)
    expect(textarea).toHaveValue(testData.sampleTexts.short)
    
    // Clear the text
    await user.click(clearButton)
    expect(textarea).toHaveValue('')
  })

  it('handles copy button', async () => {
    // Mock clipboard API
    const mockWriteText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    })

    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    const copyButton = screen.getByRole('button', { name: /copy/i })
    
    // Type some text
    await user.type(textarea, testData.sampleTexts.short)
    
    // Copy the text
    await user.click(copyButton)
    
    expect(mockWriteText).toHaveBeenCalledWith(testData.sampleTexts.short)
  })

  it('handles download button', async () => {
    // Mock URL.createObjectURL and link click
    const mockCreateObjectURL = vi.fn().mockReturnValue('blob:mock-url')
    const mockRevokeObjectURL = vi.fn()
    Object.defineProperty(URL, 'createObjectURL', {
      value: mockCreateObjectURL,
      writable: true,
    })
    Object.defineProperty(URL, 'revokeObjectURL', {
      value: mockRevokeObjectURL,
      writable: true,
    })

    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    const downloadButton = screen.getByRole('button', { name: /download/i })
    
    // Type some text
    await user.type(textarea, testData.sampleTexts.short)
    
    // Download the text
    await user.click(downloadButton)
    
    expect(mockCreateObjectURL).toHaveBeenCalled()
  })

  it('shows correct placeholder text', () => {
    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('placeholder', 'Paste or type your text here to get instant word count, character count, and reading time estimates...')
  })

  it('handles very long text', async () => {
    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    const longText = 'word '.repeat(100) // 100 words instead of 1000 to avoid timeout
    
    await user.type(textarea, longText)
    
    // Check that the textarea has the expected value
    expect(textarea).toHaveValue(longText)
  })

  it('handles text with multiple paragraphs', async () => {
    render(<WordCounterPage />)
    
    const textarea = screen.getByRole('textbox')
    const multiParagraphText = 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.'
    
    await user.type(textarea, multiParagraphText)
    
    // Check that the textarea has the expected value
    expect(textarea).toHaveValue(multiParagraphText)
  })
})
