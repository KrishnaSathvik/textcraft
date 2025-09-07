import { ToolLayout } from '@/components/layouts/ToolLayout';
import { useState } from 'react';
import { Calendar, Clock, User, Tag, ArrowRight, Type, FileText, AlignLeft, Hash, Search, Zap, Database, X } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

/**
 * Blog page with text processing tips and tutorials
 * 
 * This page provides valuable content for developers working with text processing.
 * Includes articles about using TextCraft tools and text manipulation techniques.
 */
export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);

  useSEO({
    title: 'Text Processing Blog - TextCraft | Tips, Tutorials & Text Manipulation Guides',
    description: 'Discover text processing tips, tutorials, and guides for using TextCraft tools effectively. Learn about case conversion, text diffing, word counting, and more text manipulation techniques.',
    keywords: 'text processing blog, text manipulation tips, case conversion, text diff, word counting, lorem ipsum, text tools, string processing, text analysis',
    canonical: 'https://www.textcraft.dev/blog',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'TextCraft Text Processing Blog',
      'description': 'Text processing tips, tutorials, and guides for using TextCraft tools effectively.',
      'url': 'https://www.textcraft.dev/blog',
      'publisher': {
        '@type': 'Organization',
        'name': 'TextCraft',
        'url': 'https://www.textcraft.dev'
      },
      'inLanguage': 'en-US',
      'datePublished': '2025-09-05',
      'dateModified': '2025-09-05'
    }
  });

  const blogPosts = [
    {
      id: 1,
      title: 'Mastering Text Case Conversion: A Developer\'s Complete Guide',
      excerpt: 'Learn the different text case formats, when to use each one, and how to implement robust case conversion in your applications.',
      content: `Text case conversion is one of the most fundamental operations in text processing, yet many developers struggle with the nuances of different case formats. This comprehensive guide covers everything you need to know about text case conversion, from basic concepts to advanced implementation techniques.

## Understanding Text Case Formats

### Common Case Types

**camelCase**: First word lowercase, subsequent words capitalized
\`\`\`javascript
const example = "helloWorld";
const anotherExample = "userName";
\`\`\`

**PascalCase**: All words capitalized
\`\`\`javascript
const example = "HelloWorld";
const anotherExample = "UserName";
\`\`\`

**snake_case**: Words separated by underscores
\`\`\`javascript
const example = "hello_world";
const anotherExample = "user_name";
\`\`\`

**kebab-case**: Words separated by hyphens
\`\`\`javascript
const example = "hello-world";
const anotherExample = "user-name";
\`\`\`

**SCREAMING_SNAKE_CASE**: Snake case in uppercase
\`\`\`javascript
const example = "HELLO_WORLD";
const anotherExample = "USER_NAME";
\`\`\`

## Implementation Strategies

### 1. Simple Case Conversion
\`\`\`javascript
// Convert to camelCase
function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

// Convert to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
\`\`\`

### 2. Advanced Case Conversion
\`\`\`javascript
class CaseConverter {
  static toCamelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  static toPascalCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
      .replace(/\s+/g, '');
  }

  static toSnakeCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
  }

  static toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }
}
\`\`\`

## Best Practices

1. **Consistency**: Choose one case format and stick to it throughout your project
2. **Context Matters**: Use appropriate case formats for different contexts
3. **Validation**: Always validate case conversion results
4. **Performance**: Consider performance implications for large datasets
5. **Internationalization**: Handle Unicode characters properly

## Common Pitfalls

- **Acronyms**: Handle acronyms consistently (e.g., XMLHttpRequest vs XmlHttpRequest)
- **Numbers**: Decide how to handle numbers in case conversion
- **Special Characters**: Handle special characters and symbols appropriately
- **Empty Strings**: Handle edge cases like empty strings and whitespace

## Conclusion

Text case conversion is a fundamental skill for developers. By understanding the different case formats and implementing robust conversion functions, you can write more maintainable and consistent code. Remember to consider your specific use case and choose the appropriate case format for your context.`,
      category: 'case',
      author: 'TextCraft Team',
      date: '2025-09-05',
      readTime: '8 min read',
      tags: ['Case Conversion', 'Text Processing', 'JavaScript', 'Best Practices'],
      featured: true
    },
    {
      id: 2,
      title: 'Text Diff Algorithms: Understanding and Implementing Change Detection',
      excerpt: 'Explore different text diff algorithms, their use cases, and how to implement efficient text comparison in your applications.',
      content: `Text diff algorithms are essential for tracking changes, version control, and collaborative editing. This comprehensive guide covers the most important diff algorithms, their implementations, and practical applications.

## What is Text Diffing?

Text diffing is the process of comparing two text strings and identifying the differences between them. The result is typically a set of operations that transform one string into another.

### Common Use Cases
- Version control systems (Git, SVN)
- Collaborative editing (Google Docs, Notion)
- Code review tools
- Document comparison
- Change tracking in databases

## Basic Diff Algorithms

### 1. Character-by-Character Comparison
\`\`\`javascript
function simpleDiff(oldText, newText) {
  const changes = [];
  const maxLength = Math.max(oldText.length, newText.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (oldText[i] !== newText[i]) {
      changes.push({
        type: 'change',
        position: i,
        oldChar: oldText[i] || '',
        newChar: newText[i] || ''
      });
    }
  }
  
  return changes;
}
\`\`\`

### 2. Word-by-Word Comparison
\`\`\`javascript
function wordDiff(oldText, newText) {
  const oldWords = oldText.split(/\s+/);
  const newWords = newText.split(/\s+/);
  const changes = [];
  
  let i = 0, j = 0;
  
  while (i < oldWords.length || j < newWords.length) {
    if (i >= oldWords.length) {
      changes.push({ type: 'insert', word: newWords[j], position: j });
      j++;
    } else if (j >= newWords.length) {
      changes.push({ type: 'delete', word: oldWords[i], position: i });
      i++;
    } else if (oldWords[i] === newWords[j]) {
      i++;
      j++;
    } else {
      changes.push({ type: 'change', oldWord: oldWords[i], newWord: newWords[j], position: i });
      i++;
      j++;
    }
  }
  
  return changes;
}
\`\`\`

## Advanced Diff Algorithms

### 1. Longest Common Subsequence (LCS)
\`\`\`javascript
function lcsDiff(oldText, newText) {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  
  const lcs = computeLCS(oldLines, newLines);
  const changes = [];
  
  let i = 0, j = 0, k = 0;
  
  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
      // Lines are the same
      i++;
      j++;
    } else if (i < oldLines.length && (j >= newLines.length || oldLines[i] !== lcs[k])) {
      // Line was deleted
      changes.push({ type: 'delete', line: oldLines[i], lineNumber: i });
      i++;
    } else {
      // Line was inserted
      changes.push({ type: 'insert', line: newLines[j], lineNumber: j });
      j++;
    }
  }
  
  return changes;
}

function computeLCS(arr1, arr2) {
  const m = arr1.length;
  const n = arr2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Backtrack to find LCS
  const lcs = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (arr1[i - 1] === arr2[j - 1]) {
      lcs.unshift(arr1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  
  return lcs;
}
\`\`\`

## Best Practices

1. **Choose the Right Algorithm**: Different algorithms work better for different use cases
2. **Optimize for Your Use Case**: Consider the typical size and type of text you're comparing
3. **Handle Edge Cases**: Empty strings, very long texts, and special characters
4. **Cache Results**: Cache diff results when possible to improve performance
5. **Visual Representation**: Make diffs easy to read and understand

## Common Pitfalls

- **Memory Usage**: Large texts can consume significant memory
- **Performance**: Some algorithms can be slow for very large texts
- **Unicode Handling**: Ensure proper handling of Unicode characters
- **Line Endings**: Different operating systems use different line endings

## Conclusion

Text diff algorithms are powerful tools for tracking changes and enabling collaboration. By understanding the different algorithms and their trade-offs, you can choose the right approach for your specific use case. Remember to consider performance, accuracy, and usability when implementing diff functionality in your applications.`,
      category: 'diff',
      author: 'TextCraft Team',
      date: '2025-09-05',
      readTime: '12 min read',
      tags: ['Text Diff', 'Algorithms', 'Version Control', 'Collaboration'],
      featured: true
    },
    {
      id: 3,
      title: 'Word Counting: Beyond Simple Character Counting',
      excerpt: 'Learn about different word counting methods, handling edge cases, and implementing accurate word counting for various languages and contexts.',
      content: `Word counting seems simple at first glance, but implementing accurate word counting that handles different languages, edge cases, and contexts is surprisingly complex. This comprehensive guide covers everything you need to know about word counting algorithms and their implementations.

## The Complexity of Word Counting

### What Constitutes a Word?
The definition of a "word" varies depending on context:
- **English**: Space-separated sequences of characters
- **Chinese**: No spaces between words
- **Arabic**: Right-to-left text with complex word boundaries
- **Code**: Different rules for identifiers, strings, and comments

### Common Challenges
- **Punctuation**: Should "don't" count as one word or two?
- **Hyphenated words**: Is "state-of-the-art" one word or four?
- **Numbers**: Should "123" count as a word?
- **Special characters**: How to handle emojis, symbols, and Unicode?
- **Whitespace**: Different types of whitespace and line breaks

## Basic Word Counting Algorithms

### 1. Simple Space-Separated Counting
\`\`\`javascript
function simpleWordCount(text) {
  return text.trim().split(/\s+/).length;
}

// Example
const text = "Hello world, this is a test.";
console.log(simpleWordCount(text)); // 6
\`\`\`

### 2. Improved Word Counting
\`\`\`javascript
function improvedWordCount(text) {
  // Remove extra whitespace and split on word boundaries
  const words = text
    .trim()
    .replace(/\s+/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  return words.length;
}
\`\`\`

### 3. Advanced Word Counting with Punctuation Handling
\`\`\`javascript
function advancedWordCount(text) {
  // Remove punctuation and split on word boundaries
  const words = text
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
    .split(' ')
    .filter(word => word.length > 0);
  
  return words.length;
}
\`\`\`

## Language-Specific Word Counting

### 1. Chinese Word Counting
\`\`\`javascript
function chineseWordCount(text) {
  // Chinese doesn't use spaces, so we count characters
  // But we need to distinguish between characters and punctuation
  const chineseChars = text.match(/[\u4e00-\u9fff]/g) || [];
  return chineseChars.length;
}
\`\`\`

### 2. Arabic Word Counting
\`\`\`javascript
function arabicWordCount(text) {
  // Arabic uses spaces but has right-to-left text
  const words = text
    .trim()
    .split(/\s+/)
    .filter(word => {
      // Filter out punctuation-only "words"
      return word.match(/[\u0600-\u06FF]/);
    });
  
  return words.length;
}
\`\`\`

## Comprehensive Word Counting Class

\`\`\`javascript
class WordCounter {
  constructor(options = {}) {
    this.options = {
      includeNumbers: true,
      includeHyphenated: true,
      minWordLength: 1,
      ...options
    };
  }
  
  count(text) {
    if (!text || typeof text !== 'string') {
      return 0;
    }
    
    const words = this.extractWords(text);
    return words.length;
  }
  
  extractWords(text) {
    let processedText = text;
    
    // Handle different line endings
    processedText = processedText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Remove extra whitespace
    processedText = processedText.replace(/\s+/g, ' ');
    
    // Split into words
    let words = processedText.trim().split(/\s+/);
    
    // Filter words based on options
    words = words.filter(word => this.isValidWord(word));
    
    return words;
  }
  
  isValidWord(word) {
    if (!word || word.length < this.options.minWordLength) {
      return false;
    }
    
    // Check if word contains only numbers (if numbers are excluded)
    if (!this.options.includeNumbers && /^\d+$/.test(word)) {
      return false;
    }
    
    // Check if word is hyphenated (if hyphenated words are excluded)
    if (!this.options.includeHyphenated && word.includes('-')) {
      return false;
    }
    
    return true;
  }
  
  // Get detailed statistics
  getStats(text) {
    const words = this.extractWords(text);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const lines = text.split('\n').length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    return {
      words: words.length,
      characters,
      charactersNoSpaces,
      lines,
      paragraphs,
      averageWordsPerLine: words.length / lines,
      averageCharactersPerWord: charactersNoSpaces / words.length
    };
  }
}
\`\`\`

## Best Practices

1. **Choose the Right Algorithm**: Different algorithms work better for different languages and contexts
2. **Handle Edge Cases**: Empty strings, very long texts, and special characters
3. **Consider Performance**: Use caching and debouncing for real-time applications
4. **Test Thoroughly**: Test with different languages, scripts, and edge cases
5. **Document Behavior**: Clearly document what constitutes a "word" in your implementation

## Common Pitfalls

- **Unicode Handling**: Ensure proper handling of Unicode characters and different scripts
- **Performance**: Word counting can be slow for very large texts
- **Consistency**: Ensure consistent behavior across different platforms and browsers
- **Memory Usage**: Large texts can consume significant memory during processing

## Conclusion

Word counting is more complex than it initially appears. By understanding the different challenges and implementing robust algorithms, you can create accurate and efficient word counting functionality for your applications. Remember to consider your specific use case, target languages, and performance requirements when choosing an approach.`,
      category: 'counting',
      author: 'TextCraft Team',
      date: '2025-09-05',
      readTime: '10 min read',
      tags: ['Word Counting', 'Text Analysis', 'Internationalization', 'Performance'],
      featured: false
    },
    {
      id: 4,
      title: 'Lorem Ipsum Generation: Beyond Placeholder Text',
      excerpt: 'Explore the history of Lorem Ipsum, modern generation techniques, and how to create realistic placeholder content for your projects.',
      content: `Lorem Ipsum has been the industry standard for placeholder text since the 1500s, but modern web development requires more sophisticated approaches to placeholder text generation. This comprehensive guide covers everything from the origins of Lorem Ipsum to advanced text generation techniques.

## The History of Lorem Ipsum

Lorem Ipsum is derived from a Latin text by Cicero, written in 45 BC. The text was scrambled to create the now-familiar placeholder text that doesn't distract from the design.

### Why Lorem Ipsum Works
- **Readable**: Looks like real text
- **Neutral**: Doesn't influence design decisions
- **Consistent**: Standardized length and structure
- **Universal**: Works across different languages and cultures

## Basic Lorem Ipsum Generation

### 1. Simple Word Generation
\`\`\`javascript
const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
  'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
  'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna',
  'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis',
  'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi'
];

function generateLoremIpsum(wordCount) {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
    words.push(randomWord);
  }
  return words.join(' ');
}
\`\`\`

### 2. Paragraph Generation
\`\`\`javascript
function generateParagraphs(paragraphCount, wordsPerParagraph) {
  const paragraphs = [];
  for (let i = 0; i < paragraphCount; i++) {
    const paragraph = generateLoremIpsum(wordsPerParagraph);
    paragraphs.push(paragraph);
  }
  return paragraphs.join('\n\n');
}
\`\`\`

## Advanced Text Generation

### 1. Realistic Text Generation
\`\`\`javascript
class TextGenerator {
  constructor() {
    this.wordLists = {
      nouns: ['cat', 'dog', 'house', 'car', 'book', 'computer', 'phone', 'table'],
      verbs: ['run', 'jump', 'read', 'write', 'think', 'create', 'build', 'design'],
      adjectives: ['big', 'small', 'fast', 'slow', 'beautiful', 'ugly', 'smart', 'dumb'],
      articles: ['a', 'an', 'the'],
      prepositions: ['in', 'on', 'at', 'by', 'for', 'with', 'without', 'under']
    };
  }
  
  generateSentence() {
    const structure = this.getRandomStructure();
    let sentence = '';
    
    for (const part of structure) {
      if (part === 'noun') {
        sentence += this.getRandomWord('nouns');
      } else if (part === 'verb') {
        sentence += this.getRandomWord('verbs');
      } else if (part === 'adjective') {
        sentence += this.getRandomWord('adjectives');
      } else if (part === 'article') {
        sentence += this.getRandomWord('articles');
      } else if (part === 'preposition') {
        sentence += this.getRandomWord('prepositions');
      } else {
        sentence += part;
      }
      sentence += ' ';
    }
    
    return sentence.trim() + '.';
  }
  
  getRandomStructure() {
    const structures = [
      ['article', 'adjective', 'noun', 'verb', 'preposition', 'article', 'noun'],
      ['noun', 'verb', 'adjective'],
      ['article', 'noun', 'verb', 'preposition', 'article', 'adjective', 'noun']
    ];
    
    return structures[Math.floor(Math.random() * structures.length)];
  }
  
  getRandomWord(category) {
    const words = this.wordLists[category];
    return words[Math.floor(Math.random() * words.length)];
  }
}
\`\`\`

### 2. Context-Aware Generation
\`\`\`javascript
class ContextualTextGenerator extends TextGenerator {
  constructor(context) {
    super();
    this.context = context;
    this.setupContextualWords();
  }
  
  setupContextualWords() {
    switch (this.context) {
      case 'tech':
        this.wordLists.nouns.push('algorithm', 'database', 'server', 'API', 'framework');
        this.wordLists.verbs.push('debug', 'deploy', 'optimize', 'scale', 'integrate');
        break;
      case 'business':
        this.wordLists.nouns.push('strategy', 'revenue', 'market', 'customer', 'product');
        this.wordLists.verbs.push('analyze', 'implement', 'execute', 'monitor', 'evaluate');
        break;
      case 'creative':
        this.wordLists.nouns.push('canvas', 'palette', 'brush', 'inspiration', 'vision');
        this.wordLists.verbs.push('paint', 'sketch', 'design', 'imagine', 'create');
        break;
    }
  }
}
\`\`\`

## Lorem Ipsum Variations

### 1. Different Languages
\`\`\`javascript
const loremVariations = {
  english: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  spanish: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  french: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  german: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  chinese: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  japanese: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
};

function getLocalizedLorem(language, wordCount) {
  const baseText = loremVariations[language] || loremVariations.english;
  const words = baseText.split(' ');
  const result = [];
  
  for (let i = 0; i < wordCount; i++) {
    result.push(words[i % words.length]);
  }
  
  return result.join(' ');
}
\`\`\`

### 2. Themed Lorem Ipsum
\`\`\`javascript
const themedLorem = {
  tech: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  food: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  travel: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.',
  fashion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa.'
};

function getThemedLorem(theme, wordCount) {
  const baseText = themedLorem[theme] || themedLorem.tech;
  const words = baseText.split(' ');
  const result = [];
  
  for (let i = 0; i < wordCount; i++) {
    result.push(words[i % words.length]);
  }
  
  return result.join(' ');
}
\`\`\`

## Modern Placeholder Text Services

### 1. API Integration
\`\`\`javascript
class PlaceholderTextService {
  constructor() {
    this.baseUrl = 'https://api.placeholder-text.com';
  }
  
  async generateText(options = {}) {
    const {
      type = 'lorem',
      count = 100,
      format = 'plain',
      language = 'en'
    } = options;
    
    const params = new URLSearchParams({
      type,
      count: count.toString(),
      format,
      language
    });
    
    try {
      const response = await fetch(\`\${this.baseUrl}/generate?\${params}\`);
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Error generating placeholder text:', error);
      return this.getFallbackText(count);
    }
  }
  
  getFallbackText(count) {
    return generateLoremIpsum(count);
  }
}
\`\`\`

### 2. Real-time Generation
\`\`\`javascript
class RealTimeTextGenerator {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      wordCount: 100,
      updateInterval: 1000,
      ...options
    };
    
    this.generator = new TextGenerator();
    this.startGeneration();
  }
  
  startGeneration() {
    this.updateText();
    this.interval = setInterval(() => {
      this.updateText();
    }, this.options.updateInterval);
  }
  
  updateText() {
    const text = this.generator.generateParagraphs(1, this.options.wordCount);
    this.container.textContent = text;
  }
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
\`\`\`

## Best Practices

1. **Choose Appropriate Length**: Match the placeholder text length to your design needs
2. **Consider Context**: Use themed or contextual placeholder text when appropriate
3. **Maintain Consistency**: Use the same placeholder text throughout your design
4. **Test Responsiveness**: Ensure placeholder text works well at different screen sizes
5. **Accessibility**: Consider how placeholder text affects screen readers

## Common Pitfalls

- **Overuse**: Don't rely too heavily on placeholder text
- **Inappropriate Content**: Ensure placeholder text matches your brand and context
- **Performance**: Avoid generating too much placeholder text at once
- **Accessibility**: Don't use placeholder text as the only way to convey information

## Conclusion

Lorem Ipsum and placeholder text generation are essential tools for web developers and designers. By understanding the different approaches and implementing appropriate generation techniques, you can create more realistic and effective placeholder content for your projects. Remember to consider your specific use case and choose the right approach for your needs.`,
      category: 'tools',
      author: 'TextCraft Team',
      date: '2025-09-05',
      readTime: '7 min read',
      tags: ['Lorem Ipsum', 'Placeholder Text', 'Content Generation', 'Design'],
      featured: false
    },
    {
      id: 5,
      title: 'Text Encoding and Character Sets: A Complete Guide',
      excerpt: 'Understanding text encoding, character sets, and how to handle different text formats in your applications.',
      content: `Text encoding is fundamental to how computers store and transmit text, yet many developers struggle with the complexities of different character sets and encodings. This comprehensive guide covers everything you need to know about text encoding and character sets.

## What is Text Encoding?

Text encoding is the process of converting characters into bytes that can be stored or transmitted. Different encodings use different methods to represent characters, leading to compatibility issues and data corruption if not handled properly.

### Common Character Sets
- **ASCII**: 7-bit character set with 128 characters
- **ISO-8859-1**: 8-bit character set with 256 characters
- **UTF-8**: Variable-width Unicode encoding
- **UTF-16**: 16-bit Unicode encoding
- **UTF-32**: 32-bit Unicode encoding

## Understanding Unicode

Unicode is a universal character set that includes characters from all major writing systems. It provides a unique code point for every character, regardless of platform, program, or language.

### Unicode Planes
- **Basic Multilingual Plane (BMP)**: U+0000 to U+FFFF
- **Supplementary Planes**: U+10000 to U+10FFFF
- **Private Use Areas**: U+E000 to U+F8FF

## Common Encoding Issues

### 1. Mojibake (Garbled Text)
\`\`\`javascript
// Example of encoding issues
const text = "Hello 世界"; // Contains Chinese characters
const utf8Bytes = new TextEncoder().encode(text);
const latin1String = new TextDecoder('latin1').decode(utf8Bytes);
console.log(latin1String); // "Hello ä¸ç"
\`\`\`

### 2. BOM (Byte Order Mark) Issues
\`\`\`javascript
function removeBOM(text) {
  // Remove UTF-8 BOM if present
  if (text.charCodeAt(0) === 0xFEFF) {
    return text.slice(1);
  }
  return text;
}

function addBOM(text) {
  // Add UTF-8 BOM
  return '\uFEFF' + text;
}
\`\`\`

## Working with Different Encodings

### 1. UTF-8 Encoding/Decoding
\`\`\`javascript
class TextEncoder {
  constructor() {
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }
  
  encode(text) {
    return this.encoder.encode(text);
  }
  
  decode(bytes) {
    return this.decoder.decode(bytes);
  }
  
  // Convert to different encodings
  toUTF8(text) {
    return this.encode(text);
  }
  
  fromUTF8(bytes) {
    return this.decode(bytes);
  }
}
\`\`\`

### 2. Legacy Encoding Support
\`\`\`javascript
class LegacyTextEncoder {
  constructor() {
    this.encodings = {
      'ascii': 'ascii',
      'latin1': 'latin1',
      'utf8': 'utf-8',
      'utf16': 'utf-16',
      'utf32': 'utf-32'
    };
  }
  
  encode(text, encoding = 'utf8') {
    const targetEncoding = this.encodings[encoding] || 'utf-8';
    const encoder = new TextEncoder();
    return encoder.encode(text);
  }
  
  decode(bytes, encoding = 'utf8') {
    const targetEncoding = this.encodings[encoding] || 'utf-8';
    const decoder = new TextDecoder(targetEncoding);
    return decoder.decode(bytes);
  }
}
\`\`\`

## Character Set Detection

### 1. Automatic Detection
\`\`\`javascript
class CharacterSetDetector {
  detect(bytes) {
    // Check for BOM
    if (bytes.length >= 3 && 
        bytes[0] === 0xEF && 
        bytes[1] === 0xBB && 
        bytes[2] === 0xBF) {
      return 'utf8';
    }
    
    // Check for UTF-16 BOM
    if (bytes.length >= 2) {
      if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
        return 'utf16le';
      }
      if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
        return 'utf16be';
      }
    }
    
    // Try to detect based on byte patterns
    if (this.isValidUTF8(bytes)) {
      return 'utf8';
    }
    
    if (this.isValidASCII(bytes)) {
      return 'ascii';
    }
    
    return 'latin1'; // Fallback
  }
  
  isValidUTF8(bytes) {
    for (let i = 0; i < bytes.length; i++) {
      const byte = bytes[i];
      if (byte < 0x80) {
        // ASCII character
        continue;
      } else if ((byte & 0xE0) === 0xC0) {
        // 2-byte character
        if (i + 1 >= bytes.length || (bytes[i + 1] & 0xC0) !== 0x80) {
          return false;
        }
        i++;
      } else if ((byte & 0xF0) === 0xE0) {
        // 3-byte character
        if (i + 2 >= bytes.length || 
            (bytes[i + 1] & 0xC0) !== 0x80 || 
            (bytes[i + 2] & 0xC0) !== 0x80) {
          return false;
        }
        i += 2;
      } else if ((byte & 0xF8) === 0xF0) {
        // 4-byte character
        if (i + 3 >= bytes.length || 
            (bytes[i + 1] & 0xC0) !== 0x80 || 
            (bytes[i + 2] & 0xC0) !== 0x80 || 
            (bytes[i + 3] & 0xC0) !== 0x80) {
          return false;
        }
        i += 3;
      } else {
        return false;
      }
    }
    return true;
  }
  
  isValidASCII(bytes) {
    return bytes.every(byte => byte < 0x80);
  }
}
\`\`\`

## Best Practices

1. **Always Use UTF-8**: UTF-8 is the most widely supported encoding
2. **Handle BOMs Properly**: Be aware of BOMs and handle them appropriately
3. **Validate Input**: Always validate text encoding before processing
4. **Use Libraries**: Use established libraries for complex encoding operations
5. **Test Thoroughly**: Test with different languages and character sets

## Common Pitfalls

- **Assumptions**: Don't assume all text is in a specific encoding
- **Mixed Encodings**: Avoid mixing different encodings in the same application
- **Legacy Systems**: Be careful when working with legacy systems that use older encodings
- **Performance**: Some encodings are more efficient than others for specific use cases

## Conclusion

Text encoding and character sets are fundamental to text processing. By understanding the different encodings and implementing proper handling, you can avoid common issues and create more robust applications. Remember to always use UTF-8 when possible and handle edge cases appropriately.`,
      category: 'encoding',
      author: 'TextCraft Team',
      date: '2025-09-05',
      readTime: '9 min read',
      tags: ['Text Encoding', 'Unicode', 'Character Sets', 'Internationalization'],
      featured: false
    },
    {
      id: 6,
      title: 'Text Processing Performance Optimization',
      excerpt: 'Learn how to optimize text processing operations for better performance and user experience.',
      content: `Text processing performance is crucial for user experience, especially when dealing with large amounts of text. This comprehensive guide covers optimization techniques, best practices, and common pitfalls in text processing.

## Understanding Text Processing Performance

### Common Performance Bottlenecks
- **String concatenation**: Can be slow for large strings
- **Regular expressions**: Complex patterns can be expensive
- **Memory allocation**: Frequent string creation causes garbage collection
- **Synchronous operations**: Blocking the main thread
- **Large text processing**: Memory and CPU intensive operations

### Performance Metrics
\`\`\`javascript
class PerformanceMonitor {
  static measureTime(fn, label) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(\`\${label}: \${end - start}ms\`);
    return result;
  }
  
  static measureMemory(fn, label) {
    const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    const result = fn();
    const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    console.log(\`\${label} memory: \${endMemory - startMemory} bytes\`);
    return result;
  }
}
\`\`\`

## Optimization Techniques

### 1. Efficient String Operations
\`\`\`javascript
// BAD: String concatenation in a loop
function slowConcat(strings) {
  let result = '';
  for (const str of strings) {
    result += str; // Creates new string each time
  }
  return result;
}

// GOOD: Use array join
function fastConcat(strings) {
  return strings.join('');
}

// BETTER: Use template literals for simple cases
function templateConcat(strings) {
  return \`\${strings.join('')}\`;
}
\`\`\`

### 2. Optimized Regular Expressions
\`\`\`javascript
class OptimizedRegex {
  constructor() {
    // Compile regex once, reuse many times
    this.wordRegex = /\b\w+\b/g;
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.urlRegex = /^https?:\/\/.+/;
  }
  
  findWords(text) {
    return text.match(this.wordRegex) || [];
  }
  
  validateEmail(email) {
    return this.emailRegex.test(email);
  }
  
  validateUrl(url) {
    return this.urlRegex.test(url);
  }
}
\`\`\`

## Best Practices

1. **Normalize Early**: Convert to a standard format early in your processing pipeline
2. **Preserve Original**: Keep track of the original format if you need to restore it
3. **Validate Input**: Check for mixed line breaks and other issues
4. **Use Libraries**: Consider using established libraries for complex line break handling
5. **Test Thoroughly**: Test with different line break formats and edge cases

## Common Pitfalls

- **Assumptions**: Don't assume all text uses the same line break format
- **Mixed Formats**: Be careful when processing text with mixed line break formats
- **Platform Differences**: Remember that different platforms use different line break formats
- **Performance**: Line break normalization can be expensive for large texts

## Conclusion

Text processing performance optimization requires understanding your specific use case and choosing the right techniques. By implementing caching, using appropriate data structures, and avoiding common pitfalls, you can create fast and efficient text processing applications. Remember to measure performance and optimize based on actual bottlenecks rather than assumptions.`,
      category: 'performance',
      author: 'TextCraft Team',
      date: '2025-09-05',
      readTime: '11 min read',
      tags: ['Performance', 'Optimization', 'Text Processing', 'JavaScript'],
      featured: false
    },
    {
      id: 7,
      title: 'Line Break Handling: Cross-Platform Text Processing',
      excerpt: 'Understanding different line break formats and how to handle them consistently across platforms.',
      content: `Line breaks are one of the most common sources of text processing issues, yet many developers don't understand the differences between line break formats across platforms. This comprehensive guide covers everything you need to know about line break handling.

## Understanding Line Break Formats

### Common Line Break Types
- **LF (\\n)**: Unix/Linux/Mac (newer)
- **CRLF (\\r\\n)**: Windows
- **CR (\\r)**: Old Mac systems
- **Mixed**: Files with inconsistent line breaks

### Platform Differences
\`\`\`javascript
const lineBreakTypes = {
  LF: '\n',           // Unix/Linux/Mac
  CRLF: '\r\n',       // Windows
  CR: '\r',           // Old Mac
  MIXED: 'mixed'      // Inconsistent
};

// Detect line break type
function detectLineBreakType(text) {
  const lfCount = (text.match(/\n/g) || []).length;
  const crlfCount = (text.match(/\r\n/g) || []).length;
  const crCount = (text.match(/\r/g) || []).length;
  
  if (crlfCount > 0 && lfCount === 0 && crCount === crlfCount) {
    return 'CRLF';
  } else if (lfCount > 0 && crCount === 0) {
    return 'LF';
  } else if (crCount > 0 && lfCount === 0) {
    return 'CR';
  } else {
    return 'MIXED';
  }
}
\`\`\`

## Line Break Normalization

### 1. Convert to Standard Format
\`\`\`javascript
class LineBreakNormalizer {
  constructor(targetFormat = 'LF') {
    this.targetFormat = targetFormat;
  }
  
  normalize(text) {
    switch (this.targetFormat) {
      case 'LF':
        return this.toLF(text);
      case 'CRLF':
        return this.toCRLF(text);
      case 'CR':
        return this.toCR(text);
      default:
        return text;
    }
  }
  
  toLF(text) {
    return text
      .replace(/\r\n/g, '\n')  // Convert CRLF to LF
      .replace(/\r/g, '\n');   // Convert CR to LF
  }
  
  toCRLF(text) {
    return text
      .replace(/\r\n/g, '\n')  // Normalize CRLF to LF first
      .replace(/\r/g, '\n')    // Convert CR to LF
      .replace(/\n/g, '\r\n'); // Convert LF to CRLF
  }
  
  toCR(text) {
    return text
      .replace(/\r\n/g, '\n')  // Normalize CRLF to LF first
      .replace(/\n/g, '\r');   // Convert LF to CR
  }
}
\`\`\`

## Best Practices

1. **Normalize Early**: Convert to a standard format early in your processing pipeline
2. **Preserve Original**: Keep track of the original format if you need to restore it
3. **Validate Input**: Check for mixed line breaks and other issues
4. **Use Libraries**: Consider using established libraries for complex line break handling
5. **Test Thoroughly**: Test with different line break formats and edge cases

## Common Pitfalls

- **Assumptions**: Don't assume all text uses the same line break format
- **Mixed Formats**: Be careful when processing text with mixed line break formats
- **Platform Differences**: Remember that different platforms use different line break formats
- **Performance**: Line break normalization can be expensive for large texts

## Conclusion

Line break handling is crucial for cross-platform text processing. By understanding the different formats and implementing proper normalization, you can avoid common issues and create more robust applications. Remember to always normalize line breaks early in your processing pipeline and test with different formats.`,
      category: 'tools',
      author: 'TextCraft Team',
      date: '2025-09-05',
      readTime: '8 min read',
      tags: ['Line Breaks', 'Cross-Platform', 'Text Processing', 'Normalization'],
      featured: false
    },
    {
      id: 8,
      title: 'Text Validation and Sanitization: Security Best Practices',
      excerpt: 'Learn how to properly validate and sanitize text input to prevent security vulnerabilities and ensure data integrity.',
      content: `Text validation and sanitization are critical for security and data integrity, yet many developers don't implement them properly. This comprehensive guide covers best practices, common vulnerabilities, and how to implement robust text validation.

## Understanding Text Validation

### What is Text Validation?
Text validation is the process of checking text input against predefined rules to ensure it meets certain criteria. This includes format validation, length checks, and content filtering.

### Common Validation Types
- **Format Validation**: Email, phone numbers, URLs
- **Length Validation**: Minimum and maximum character limits
- **Content Validation**: Allowed characters, patterns
- **Security Validation**: XSS prevention, SQL injection prevention

## Basic Validation Techniques

### 1. Format Validation
\`\`\`javascript
class TextValidator {
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }
  
  validateURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  
  validateLength(text, min, max) {
    return text.length >= min && text.length <= max;
  }
}
\`\`\`

### 2. Content Validation
\`\`\`javascript
class ContentValidator {
  validateAlphanumeric(text) {
    return /^[a-zA-Z0-9]+$/.test(text);
  }
  
  validateNoSpecialChars(text) {
    return /^[a-zA-Z0-9\s]+$/.test(text);
  }
  
  validateNoHTML(text) {
    return !/<[^>]*>/g.test(text);
  }
  
  validateNoScript(text) {
    return !/<script[^>]*>.*?<\/script>/gi.test(text);
  }
}
\`\`\`

## Security Considerations

### 1. XSS Prevention
\`\`\`javascript
class XSSPrevention {
  sanitizeInput(text) {
    // Remove potentially dangerous content
    return text
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }
  
  validateInput(text) {
    const dangerousPatterns = [
      /<script[^>]*>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>/gi
    ];
    
    return !dangerousPatterns.some(pattern => pattern.test(text));
  }
}
\`\`\`

## Best Practices

1. **Validate Early**: Validate input as soon as possible
2. **Sanitize Before Storage**: Sanitize text before storing in databases
3. **Use Whitelists**: Prefer whitelist validation over blacklist
4. **Escape Output**: Always escape text when displaying to users
5. **Test Thoroughly**: Test with various input types and edge cases

## Common Pitfalls

- **Incomplete Validation**: Not validating all input fields
- **Client-Side Only**: Relying only on client-side validation
- **Over-Sanitization**: Removing legitimate content
- **Performance**: Inefficient validation for large texts
- **Unicode**: Not handling Unicode characters properly

## Conclusion

Text validation and sanitization are essential for security and data integrity. By implementing proper validation rules and sanitization techniques, you can prevent common vulnerabilities and ensure your application handles text input safely. Remember to validate early, sanitize before storage, and test thoroughly with various input types.`,
      category: 'security',
      author: 'TextCraft Team',
      date: '2025-09-05',
      readTime: '10 min read',
      tags: ['Text Validation', 'Security', 'Sanitization', 'XSS Prevention'],
      featured: false
    },
    {
      id: 9,
      title: 'Text Analysis and NLP Basics for Developers',
      excerpt: 'Introduction to text analysis and natural language processing techniques that every developer should know.',
      content: `Text analysis and natural language processing (NLP) are powerful tools for extracting insights from text data. This comprehensive guide covers the basics of text analysis and NLP techniques that every developer should know.

## What is Text Analysis?

Text analysis is the process of extracting meaningful information from text data. It involves various techniques to understand, process, and analyze text content.

### Common Text Analysis Tasks
- **Sentiment Analysis**: Determining the emotional tone of text
- **Topic Modeling**: Identifying main topics in a collection of documents
- **Named Entity Recognition**: Identifying and classifying named entities
- **Text Classification**: Categorizing text into predefined categories
- **Keyword Extraction**: Identifying important keywords and phrases

## Basic Text Analysis Techniques

### 1. Text Preprocessing
\`\`\`javascript
class TextPreprocessor {
  preprocess(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  tokenize(text) {
    return text.split(/\s+/);
  }
  
  removeStopWords(tokens) {
    const stopWords = new Set([
      'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
      'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
      'to', 'was', 'will', 'with'
    ]);
    
    return tokens.filter(token => !stopWords.has(token));
  }
  
  stem(tokens) {
    // Simple stemming (remove common suffixes)
    return tokens.map(token => {
      if (token.endsWith('ing')) {
        return token.slice(0, -3);
      }
      if (token.endsWith('ed')) {
        return token.slice(0, -2);
      }
      if (token.endsWith('s') && token.length > 3) {
        return token.slice(0, -1);
      }
      return token;
    });
  }
}
\`\`\`

### 2. Word Frequency Analysis
\`\`\`javascript
class WordFrequencyAnalyzer {
  analyze(text) {
    const preprocessor = new TextPreprocessor();
    const processed = preprocessor.preprocess(text);
    const tokens = preprocessor.tokenize(processed);
    const filtered = preprocessor.removeStopWords(tokens);
    const stemmed = preprocessor.stem(filtered);
    
    const frequencies = new Map();
    for (const token of stemmed) {
      if (token.length > 2) {
        frequencies.set(token, (frequencies.get(token) || 0) + 1);
      }
    }
    
    return Array.from(frequencies.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }
}
\`\`\`

## Advanced Text Analysis

### 1. Sentiment Analysis
\`\`\`javascript
class SentimentAnalyzer {
  constructor() {
    this.positiveWords = new Set([
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
      'love', 'like', 'enjoy', 'happy', 'pleased', 'satisfied'
    ]);
    
    this.negativeWords = new Set([
      'bad', 'terrible', 'awful', 'horrible', 'disgusting', 'hate',
      'dislike', 'angry', 'sad', 'disappointed', 'frustrated'
    ]);
  }
  
  analyze(text) {
    const preprocessor = new TextPreprocessor();
    const processed = preprocessor.preprocess(text);
    const tokens = preprocessor.tokenize(processed);
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    for (const token of tokens) {
      if (this.positiveWords.has(token)) {
        positiveScore++;
      } else if (this.negativeWords.has(token)) {
        negativeScore++;
      }
    }
    
    const totalScore = positiveScore + negativeScore;
    if (totalScore === 0) {
      return { sentiment: 'neutral', score: 0 };
    }
    
    const score = (positiveScore - negativeScore) / totalScore;
    let sentiment;
    
    if (score > 0.1) {
      sentiment = 'positive';
    } else if (score < -0.1) {
      sentiment = 'negative';
    } else {
      sentiment = 'neutral';
    }
    
    return { sentiment, score, positiveScore, negativeScore };
  }
}
\`\`\`

## Best Practices

1. **Preprocess Text**: Always clean and normalize text before analysis
2. **Remove Stop Words**: Filter out common words that don't add meaning
3. **Use Appropriate Metrics**: Choose the right similarity measures for your use case
4. **Validate Results**: Always validate your analysis results
5. **Consider Context**: Take into account the context and domain of your text

## Common Pitfalls

- **Overfitting**: Creating models that work too well on training data
- **Bias**: Not accounting for bias in your data or algorithms
- **Performance**: Inefficient algorithms for large datasets
- **Accuracy**: Not validating the accuracy of your analysis
- **Scalability**: Not considering scalability for production use

## Conclusion

Text analysis and NLP are powerful tools for extracting insights from text data. By understanding the basic techniques and implementing them properly, you can create more intelligent applications that can understand and process text effectively. Remember to preprocess your text, choose appropriate algorithms, and validate your results.`,
      category: 'analysis',
      author: 'TextCraft Team',
      date: '2025-09-05',
      readTime: '12 min read',
      tags: ['Text Analysis', 'NLP', 'Machine Learning', 'Data Science'],
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', icon: Type },
    { id: 'tools', name: 'Tool Tips', icon: Type },
    { id: 'case', name: 'Case Conversion', icon: FileText },
    { id: 'diff', name: 'Text Diffing', icon: AlignLeft },
    { id: 'counting', name: 'Text Counting', icon: Hash },
    { id: 'encoding', name: 'Text Encoding', icon: Database },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'analysis', name: 'Text Analysis', icon: Search }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <ToolLayout>
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4">
              TextCraft Blog
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn from our collection of text processing tips, tutorials, and best practices. Covering case conversion, text diffing, word counting, and more to help you become a better developer.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">

        {/* Featured Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">{post.tags[0]}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-border hover:bg-secondary'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {selectedCategory === 'all' ? 'All Posts' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">{post.tags[0]}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Blog Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">{selectedPost.tags[0]}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{selectedPost.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <h1 className="text-3xl font-bold text-foreground mb-4">{selectedPost.title}</h1>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedPost.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div 
                    className="whitespace-pre-wrap text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedPost.content
                        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code class="text-sm">$2</code></pre>')
                        .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
                        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h2>')
                        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">$1</h3>')
                        .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-medium mt-4 mb-2 text-foreground">$1</h4>')
                        .replace(/^\- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
                        .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                        .replace(/\n\n/g, '</p><p class="mb-4">')
                        .replace(/^(?!<[h|l])/gm, '<p class="mb-4">')
                        .replace(/<p class="mb-4"><\/p>/g, '')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
