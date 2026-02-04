# Contributing to Pragati Design Studio

Thank you for your interest in contributing to Pragati Design Studio! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## 🤝 Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please be respectful and constructive in all interactions.

---

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pragati-design-studio.git
   cd pragati-design-studio
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/pragati-design-studio.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   cd backend && npm install
   ```
5. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## 💻 Development Workflow

### **Running Locally**

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend (in a new terminal):
   ```bash
   npm run dev
   ```

### **Before Committing**

1. **Test your changes** thoroughly
2. **Check for TypeScript errors**:
   ```bash
   npm run type-check
   ```
3. **Format your code** (if using Prettier):
   ```bash
   npm run format
   ```

---

## 📝 Coding Standards

### **TypeScript**

- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type when possible
- Use meaningful variable names

### **React Components**

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Follow the single responsibility principle

### **File Naming**

- Components: `PascalCase.tsx` (e.g., `BlogManager.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Contexts: `PascalCase.tsx` (e.g., `BlogContext.tsx`)

### **Code Style**

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add comments for complex logic
- Keep lines under 100 characters when possible

### **CSS/Styling**

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use CSS variables for theme colors
- Avoid inline styles when possible

---

## 📝 Commit Guidelines

### **Commit Message Format**

```
<type>(<scope>): <subject>

<body>

<footer>
```

### **Types**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### **Examples**

```bash
feat(blog): add multi-image support to blog posts

- Added images array to BlogPost interface
- Updated BlogContext to handle multiple images
- Modified BlogDetail to display image gallery

Closes #123
```

```bash
fix(contact): resolve form validation issue

Fixed email validation regex to accept all valid email formats
```

---

## 🔄 Pull Request Process

1. **Update your fork** with the latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub

4. **Fill out the PR template** with:
   - Description of changes
   - Related issue numbers
   - Screenshots (if UI changes)
   - Testing steps

5. **Wait for review** and address any feedback

6. **Squash commits** if requested

### **PR Checklist**

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated (if needed)
- [ ] No new warnings or errors
- [ ] Tested on multiple browsers (if frontend)
- [ ] Responsive design verified (if UI changes)

---

## 🐛 Reporting Bugs

### **Before Submitting**

- Check if the bug has already been reported
- Verify it's reproducible in the latest version
- Collect relevant information

### **Bug Report Template**

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information.
```

---

## 💡 Suggesting Features

### **Feature Request Template**

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Any other relevant information, mockups, or examples.
```

---

## 🏗️ Project Areas

### **Frontend**

- React components
- UI/UX improvements
- Responsive design
- Performance optimization
- Accessibility

### **Backend**

- API endpoints
- Database schema
- Authentication
- File upload
- Performance

### **Documentation**

- README improvements
- API documentation
- Code comments
- Tutorials

### **Testing**

- Unit tests
- Integration tests
- E2E tests

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

---

## ❓ Questions?

If you have questions, feel free to:
- Open an issue with the `question` label
- Reach out to the maintainers
- Check existing discussions

---

**Thank you for contributing to Pragati Design Studio! 🎉**
