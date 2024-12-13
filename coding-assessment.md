# Coding Assessment (2 hours)

## Task: Build a Dynamic Form Builder

Create a form builder application using Next.js, TanStack Query, and shadcn/ui components. The application should demonstrate your expertise with modern frontend development practices and tools.

## Core Requirements

### 1. Form Builder Features
- Drag and drop different form elements:
  - Text input
  - Select dropdown
  - Checkbox
  - Radio buttons
  - Text area
- Configure validation rules
- Save form templates
- Preview form in real-time

### 2. Technical Implementation

#### Architecture
- Use Next.js App Router
- Implement proper separation of Server and Client Components
- Follow React Server Components best practices
- Use proper error boundaries

#### Components
- Utilize shadcn/ui components
- Create reusable custom components where needed
- Implement proper component composition
- Add loading states and error handling

#### Data Management
- Use TanStack Query for data fetching and caching
- Implement optimistic updates
- Handle loading and error states effectively

### 3. API Integration
The following mock API endpoints are provided:

```typescript
// Available at /api/templates
interface TemplateAPI {
    // Get all templates
    // GET /api/templates

    // Create new template
    // POST /api/templates
    
    // Update template
    // PUT /api/templates/:id
    
    // Delete template
    // DELETE /api/templates/:id
}

// Available at /api/submissions
interface SubmissionAPI {
    // Get form submissions
    // GET /api/submissions/:formId
    
    // Submit form data
    // POST /api/submissions
}
```

## Evaluation Criteria

### 1. Code Quality
- Clean, maintainable code
- Proper TypeScript usage
- Effective error handling
- Clear documentation
- Testing implementation

### 2. Architecture
- Proper use of React Server Components
- Effective component composition
- State management implementation
- Error boundary implementation

### 3. Technical Decisions
- Choice of Server vs Client Components
- Data fetching strategies
- State management approach
- Developer productivity tools usage

### 4. User Experience
- Smooth drag and drop implementation
- Responsive design
- Proper loading states
- Error handling

## Getting Started

1. The repository includes a base Next.js template with:
   - shadcn/ui configured
   - TanStack Query setup
   - Basic file structure
   - Mock API endpoints
   - TypeScript configuration

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. API routes are available at:
   - http://localhost:3000/api/templates
   - http://localhost:3000/api/submissions

## Submission Requirements

1. Code Implementation
   - Complete solution pushed to your solution branch
   - All core requirements implemented
   - Tests added where appropriate

2. Documentation
   - Update the README.md in your solution with:
     - Setup instructions
     - Architecture decisions
     - Trade-offs made
     - Future improvements

3. Deployment
   - Deploy to Vercel
   - Add deployed URL to PR description

4. Video Walkthrough (Optional)
   - 5-minute maximum demo
   - Highlight technical decisions
   - Explain architecture choices
   - Add video link to PR

## Time Management Tips

1. Start with core functionality
2. Implement basic features first
3. Add enhancement if time permits
4. Document any incomplete features

If you run out of time, document:
- What you would have done differently
- Features you would add
- Potential improvements
- Known limitations

## Need Help?

If you encounter technical issues:
1. Check the provided template documentation
2. Review the API documentation
3. Open an issue in the repository
4. Create an [Issue](https://github.com/data-kinetic/front-end-dev) and at dgonzo