import type { ToolHelpItem, ToolHelpStep } from '@/types/tool';

interface ToolHelpContent {
  howToSteps: ToolHelpStep[];
  whyUseItems: ToolHelpItem[];
  keyFeatures: string[];
}

export const TOOL_HELP_CONTENT: Record<string, ToolHelpContent> = {
  'word-counter': {
    howToSteps: [
      { title: 'Paste Your Text', description: 'Copy and paste your text into the text area. You can also type directly.' },
      { title: 'View Statistics', description: 'Instantly see word count, character count, reading time, and other metrics.' },
      { title: 'Export or Copy', description: 'Use the copy or download buttons to save your text and statistics.' },
    ],
    whyUseItems: [
      { title: 'Meet Writing Requirements', description: 'Ensure your content meets specific word count requirements for essays, articles, or assignments.' },
      { title: 'Optimize Reading Experience', description: 'Get accurate reading time estimates to help readers understand content length before diving in.' },
      { title: 'Content Analysis', description: 'Analyze text structure, sentence length, and paragraph distribution for better writing.' },
      { title: 'SEO Optimization', description: 'Optimize content length for search engines and social media platforms.' },
    ],
    keyFeatures: [
      'Real-time word and character counting',
      'Reading time estimates (225 WPM average)',
      'Speaking time calculations (130 WPM average)',
      'Sentence and paragraph analysis',
      'Character density and line counting',
      'Instant copy and download options',
      'Privacy-focused (all processing in browser)',
    ],
  },
  'case-converter': {
    howToSteps: [
      { title: 'Enter Your Text', description: 'Type or paste your text in the left text area. The tool will show a live preview.' },
      { title: 'Choose Case Type', description: 'Select from uppercase, lowercase, title case, camelCase, kebab-case, and more.' },
      { title: 'Apply & Export', description: 'Apply the changes, copy the result, or download it as a text file.' },
    ],
    whyUseItems: [
      { title: 'Code Formatting', description: 'Convert variable names, function names, and constants to proper coding conventions.' },
      { title: 'Content Standardization', description: 'Ensure consistent text formatting across documents, titles, and headings.' },
      { title: 'URL and File Naming', description: 'Convert text to URL-friendly formats like kebab-case or snake_case.' },
      { title: 'Data Processing', description: 'Normalize data formats for databases, APIs, and data analysis.' },
    ],
    keyFeatures: [
      'UPPERCASE and lowercase conversion',
      'Title Case and Sentence case',
      'camelCase and PascalCase',
      'kebab-case and snake_case',
      'Real-time preview and conversion',
      'Undo/Redo functionality',
      'Copy and download options',
    ],
  },
  'line-breaks': {
    howToSteps: [
      { title: 'Paste Your Text', description: 'Copy and paste your messy text into the left text area. The tool will show a live preview.' },
      { title: 'Select Options', description: 'Choose which cleanup options to apply: remove extra lines, trim spaces, join lines, etc.' },
      { title: 'Apply & Export', description: 'Apply the changes, copy the cleaned text, or download it as a file.' },
    ],
    whyUseItems: [
      { title: 'Clean Text Formatting', description: 'Remove inconsistent line breaks, extra spaces, and formatting issues from copied text.' },
      { title: 'Improve Readability', description: 'Normalize text structure for better reading experience and professional appearance.' },
      { title: 'Data Processing', description: 'Prepare text for databases, APIs, and data analysis by standardizing format.' },
      { title: 'Code Preparation', description: 'Clean up text before processing in code, removing unwanted whitespace and line breaks.' },
    ],
    keyFeatures: [
      'Remove extra blank lines and normalize spacing',
      'Trim trailing spaces and tabs',
      'Join lines with single spaces',
      'Convert smart quotes to ASCII',
      'Normalize line break formats',
      'Real-time preview and character count',
      'Customizable cleanup options',
    ],
  },
  'diff-checker': {
    howToSteps: [
      { title: 'Enter Both Texts', description: 'Paste your original text in the left area and the modified text in the right area.' },
      { title: 'Choose Comparison Mode', description: 'Select line-by-line or word-by-word comparison based on your needs.' },
      { title: 'Review Differences', description: 'Examine the highlighted differences and export the results if needed.' },
    ],
    whyUseItems: [
      { title: 'Version Control', description: 'Compare different versions of documents, code, or content to track changes.' },
      { title: 'Quality Assurance', description: 'Identify differences between original and edited content for proofreading.' },
      { title: 'Code Review', description: 'Compare code changes, identify bugs, and review modifications.' },
      { title: 'Document Comparison', description: 'Compare contracts, legal documents, or any text-based files.' },
    ],
    keyFeatures: [
      'Line-by-line and word-by-word comparison',
      'Color-coded differences (added, removed, unchanged)',
      'Unified diff format output',
      'Side-by-side text comparison',
      'Real-time diff calculation',
      'Export and copy diff results',
      'Text swap functionality',
    ],
  },
  'lorem-ipsum': {
    howToSteps: [
      { title: 'Choose Content Type', description: 'Select from Classic, Modern, Tech, or Business lorem ipsum variants.' },
      { title: 'Set Format & Length', description: 'Choose words, sentences, or paragraphs and adjust the length with the slider.' },
      { title: 'Generate & Copy', description: 'Generate your placeholder text and copy or download it for your project.' },
    ],
    whyUseItems: [
      { title: 'Design Mockups', description: 'Create realistic placeholder text for website designs, wireframes, and prototypes.' },
      { title: 'Content Testing', description: 'Test layouts, typography, and spacing without waiting for real content.' },
      { title: 'Client Presentations', description: 'Show clients how their content will look with realistic placeholder text.' },
      { title: 'Development Testing', description: 'Test text rendering, overflow handling, and responsive design with various text lengths.' },
    ],
    keyFeatures: [
      'Multiple content types (Classic, Modern, Tech, Business)',
      'Flexible formats (words, sentences, paragraphs)',
      'Customizable length with slider control',
      'HTML formatting options',
      'Real-time generation and preview',
      'Copy and download functionality',
      'Professional placeholder text',
    ],
  },
  'text-sorter': {
    howToSteps: [
      { title: 'Enter Your Text', description: 'Paste or type your text. Each line will be treated as a separate item to sort.' },
      { title: 'Choose Sort Option', description: 'Select how you want to sort your text from the available options.' },
      { title: 'View & Copy Results', description: 'See your sorted text and use copy or download buttons to save it.' },
    ],
    whyUseItems: [
      { title: 'Organize Lists & Data', description: 'Sort shopping lists, names, numbers, or any text data alphabetically or by length for better organization.' },
      { title: 'Remove Duplicates', description: 'Clean up your data by automatically removing duplicate lines while preserving the original order.' },
      { title: 'Multiple Sort Options', description: 'Choose from alphabetical, length-based, numerical, or reverse sorting to fit your specific needs.' },
    ],
    keyFeatures: [
      'Real-time processing',
      'Preserve original text in a separate panel',
      'Export and share via copy or download',
      'Alphabetical and reverse sorting',
      'Sort by line length',
      'Remove duplicate lines',
      'Numerical sorting',
    ],
  },
};
