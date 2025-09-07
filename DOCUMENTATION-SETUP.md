# 📚 TextCraft Documentation Setup

This project is now configured with TypeDoc to generate a beautiful documentation website from JSDoc comments.

## What's Included

- **TypeDoc**: Documentation generator for TypeScript projects
- **Custom Theme**: Dark theme with TextCraft branding
- **Component Coverage**: All key components documented with JSDoc
- **Interactive Navigation**: Sidebar navigation with categories and search
- **Responsive Design**: Mobile-friendly documentation layout

## Configuration Files

- `typedoc.json` - TypeDoc configuration and entry points
- `typedoc-custom.css` - Custom styling for TextCraft theme
- `TEXTCRAFT-DOCUMENTATION-GUIDE.md` - Comprehensive documentation guide

## Documented Components

- **Tool Components**: WordCounter, CaseConverter, DiffChecker, LineBreaks, LoremIpsum
- **Core Infrastructure**: ToolLayout, Navigation
- **Theme Management**: ThemeProvider, ThemeToggle
- **Hooks**: useSEO, useAnalytics
- **Utilities**: Text processing functions and utilities

## Generating Documentation

You'll need to install TypeDoc first:

```bash
npm install
```

Then run:
- `npm run docs:build` - Generate static documentation website
- `npm run docs:serve` - Generate and serve with live reload (for development)
- `npm run docs:clean` - Clean generated docs

## Viewing Documentation

After running `npm run docs:build`:

1. **Open `docs/index.html`** in your browser
2. **Or serve it locally:**
   ```bash
   # Using Python (if installed)
   cd docs && python -m http.server 8000
   
   # Using Node.js serve package
   npx serve docs
   
   # Using VS Code Live Server extension
   # Right-click docs/index.html -> "Open with Live Server"
   ```

## Deployment Options

### GitHub Pages
1. Push the `docs` folder to your repo
2. Go to repo Settings > Pages
3. Set source to "Deploy from a branch"
4. Select `main` branch and `/docs` folder

### Netlify
1. Drag the `docs` folder to [netlify.com/drop](https://netlify.com/drop)
2. Or connect your GitHub repo and set build command to `npm run docs:build`

### Vercel
1. Connect your repo to Vercel
2. Set build command: `npm run docs:build`
3. Set output directory: `docs`

## Features

✅ **Professional Documentation** with:
- All JSDoc comments rendered as HTML
- Interactive navigation sidebar with categories
- Search functionality across all components
- Component hierarchy and relationships
- Usage examples and code snippets
- Dark theme matching TextCraft design
- Mobile responsive layout

✅ **Developer Experience**:
- Type information for all props and methods
- Inheritance chains and interfaces
- Cross-referenced links between components
- Source code links to GitHub
- Module organization by categories

## Customization

You can modify `typedoc.json` to:
- **Change theme**: Set `"theme": "minimal"` or install custom themes
- **Add more files**: Add to `entryPoints` array
- **Custom branding**: Add logo with `"logo": "./logo.png"`
- **Plugin support**: Add TypeDoc plugins for extra features
- **Categories**: Modify `categoryOrder` for custom organization

## Documentation Categories

Your documentation is organized into:

- **🔧 Tool Components**: All text processing tools
- **🏗️ Core Infrastructure**: Layout and navigation components  
- **🎨 Theme Management**: Theme provider and toggle components
- **🪝 Hooks**: Custom React hooks
- **🛠️ Utilities**: Text processing and utility functions
- **📝 API Reference**: Detailed technical documentation

## Writing Documentation

For new components, follow JSDoc best practices:

```tsx
/**
 * A reusable button component with multiple variants
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 * ```
 * 
 * @param props - The component props
 * @param props.variant - Button style variant
 * @param props.size - Button size
 * @param props.children - Button content
 */
export const Button = ({ variant, size, children }: ButtonProps) => {
  // Component implementation
}
```

## TextCraft-Specific Features

### Branding
- Custom purple-to-blue gradient theme
- TextCraft color scheme throughout
- Professional dark theme optimized for readability
- Responsive design for all devices

### Component Organization
- **Tool Components**: All 5 text processing tools documented
- **Infrastructure**: Core layout and navigation components
- **Theme System**: Complete theme management documentation
- **Utilities**: Text processing functions and helpers

### SEO Integration
- All components include SEO considerations
- Structured data for search engines
- Meta tags and descriptions
- Breadcrumb navigation

## Troubleshooting

### Common Issues

#### TypeDoc Command Not Found
```bash
# Install TypeDoc globally
npm install -g typedoc

# Or use npx
npx typedoc
```

#### Missing Dependencies
```bash
# Install all dependencies
npm install

# Reinstall if needed
rm -rf node_modules package-lock.json
npm install
```

#### Build Errors
```bash
# Check TypeScript compilation
npm run build

# Fix any TypeScript errors first
# Then run documentation build
npm run docs:build
```

### Performance Tips

- **Large Projects**: Consider excluding test files and node_modules
- **Memory Issues**: Use `--exclude` patterns to reduce scope
- **Build Time**: Use `--watch` mode during development

## Best Practices

### Documentation Standards
1. **Always document public APIs** with JSDoc comments
2. **Include usage examples** for complex components
3. **Document props and methods** with TypeScript types
4. **Keep examples up-to-date** with code changes
5. **Use descriptive names** and clear descriptions

### Maintenance
1. **Update documentation** when changing component APIs
2. **Review examples** for accuracy
3. **Test documentation** by generating it regularly
4. **Keep configuration** in sync with project structure

## Result

This creates a professional documentation site perfect for:
- **Team members** learning the codebase
- **Contributors** understanding the architecture
- **Your portfolio** showcasing professional development practices
- **Future maintenance** with comprehensive component documentation

The documentation follows industry standards and provides everything needed for both current development and future maintenance! 🚀

## Additional Resources

- [TypeDoc Documentation](https://typedoc.org/)
- [JSDoc Reference](https://jsdoc.app/)
- [TextCraft GitHub](https://github.com/KrishnaSathvik/textcraft)
- [Component Guide](./TEXTCRAFT-DOCUMENTATION-GUIDE.md)

---

**Made with ❤️ by TextCraft Team**
