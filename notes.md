
# Form Builder Application

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>

Install dependencies:
```
npm install
# or
yarn install
Start the development server:  
npm run dev
# or
yarn dev
```

## Architecture Decisions
Next.js App Router: Utilized for routing and server-side rendering.
React Server Components: Implemented where possible to improve performance and reduce client-side JavaScript.
TanStack Query: Used for data fetching and caching to manage server state efficiently.
shadcn/ui Components: Leveraged for consistent and reusable UI components.
Custom Components: Created for form elements and validation to ensure modularity and reusability.

## Trade-offs Made
Incomplete Server-Side Components: Due to time constraints, not all components were fully implemented as server-side components.
CSS Quality: The styling is basic and needs improvement for a better user experience.
Drag and Drop Functionality: Implemented but currently buggy and needs refinement.
Validation: Basic validation is in place but has some issues that need to be addressed.
Feature Implementation: Not all core features were implemented due to time constraints.

## Future Improvements
fetchForms: Implement a function to fetch form data from the API and populate the form builder with existing forms.
Complete Server-Side Components: Fully implement server-side components with TanStack Query for better performance.
Improve CSS: Enhance the styling to provide a more polished and user-friendly interface.
Fix Drag and Drop: Resolve bugs in the drag and drop functionality to ensure smooth user interactions.
Enhance Validation: Improve validation logic to handle more complex scenarios and provide better user feedback.
Add Missing Features: Implement the remaining core features such as additional form elements and advanced configuration options.
Testing: Add comprehensive tests to ensure the reliability and stability of the application.
Documentation: Expand the documentation to cover all aspects of the application, including detailed setup instructions and usage examples.