# Written Assessment (45 minutes)

Please provide thorough answers to the following questions. Include code examples where relevant.

## Technical Assessment Questions

### 1. React Server Components (RSC)
a) Explain the key differences between Server Components and Client Components in Next.js. Include specific use cases for each.
Server Components (SC):

Rendered on the server.
Do not include React state, effects, or browser-only APIs (e.g., localStorage, window).
Enable direct interaction with server-side resources like databases, without exposing these to the client.
Ideal for static or frequently updated data, such as news feeds, product catalogs, or dashboards.
Client Components (CC):

Rendered in the browser.
Use React state, effects, and client-side APIs.
Allow interactive features such as form handling, animations, and live updates.
Ideal for dynamic user interactions, like modals, drag-and-drop interfaces, or search components.
Example Use Case:

Server Component: Rendering a list of articles fetched directly from a database.
Client Component: A like button for each article that tracks state and updates dynamically.
b) How do RSCs impact application performance and bundle size?
Performance:

Reduces client-side JavaScript since logic is executed server-side.
Improves initial load time by sending pre-rendered HTML to the client.
Offloads computation to the server, reducing client device load.
Bundle Size:

Decreases as SCs do not include client-side React dependencies.
Leads to leaner JavaScript bundles, improving download and execution time.
c) Describe the data fetching pattern you would implement with RSCs.
We can utilize fetch or React's cache function to retrieve identical data across components that require it, ensuring no duplicate requests are made. React enhances fetch by automatically caching data requests through memoization, while the cache function serves as an alternative for scenarios where fetch cannot be used.

### 2. State Management & Data Fetching
a) Compare and contrast TanStack Query (formerly React Query) with traditional Redux/Context API state management. When would you choose one over the other?

TanStack Query:
Focused on server state.
Handles caching, background updates, and re-fetching automatically.
Best for data-fetching needs with minimal boilerplate.

Redux/Context API:
Handles global application state (UI, auth, etc.).
Requires explicit state updates and more setup (reducers, actions).
Better suited for scenarios involving client state or complex business logic.

When to Choose:
TanStack Query: For APIs, server-side state, or real-time data needs.
Redux/Context API: For global client-side state or complex UI states.


b) Explain TanStack Query's stale-while-revalidate strategy and its benefits.
Stale-While-Revalidate (SWR):
Returns cached data while fetching updated data in the background.
Ensures a fast user experience by reducing loading times.
Benefits:

Provides instant feedback with stale data.
Updates the UI seamlessly when fresh data is fetched.
Reduces unnecessary network calls.

c) How would you handle optimistic updates using TanStack Query?
Update Locally:
Modify the cache immediately using queryClient.setQueryData.

Rollback on Failure:
Use onError in the mutation to restore previous state.

### 3. Component Architecture
a) Describe your approach to building a reusable component library using shadcn/ui.
We can use the 
To build a reusable component library using shadcn/ui, I would modularize components by functionality (e.g., Button, Card, Modal) while ensuring they accept props to make them flexible and reusable across various contexts. Each component would support theming (light/dark mode) and accessibility through ARIA attributes. The components' structure would include their logic (component.js) and styles (component.css) in separate folders, organized under a central components/ directory. Additionally, I would manage themes using separate CSS files (e.g., light.css, dark.css) and provide utilities to switch themes dynamically. This approach promotes reusability, flexibility through props, maintainability, and adherence to accessibility standards, creating a modular and scalable UI component library.

b) How do you handle component composition and prop drilling in large applications?
We can use context api for handle a state managment arround all the application or libraries like
mobx or redux to have a better control of state and props.

c) Explain your strategy for managing component styling and theming across a large application.
Styling:
Use CSS-in-JS libraries like styled-components or TailwindCSS.
Separate global styles and component-specific styles.

Theming:
Use a ThemeProvider and CSS variables for dynamic theming.

### 4. Performance & Productivity
a) What metrics do you consider when optimizing a Next.js application's performance?
First Contentful Paint (FCP).
Largest Contentful Paint (LCP).
Total Blocking Time (TBT).
Cumulative Layout Shift (CLS).

b) What tools and practices do you use to improve your daily development workflow?
I use tools like prettier, eslint, vscode, husky, sitespeed, lighthouse

c) Share an example of a challenging debugging scenario and how your debugging toolkit helped resolve it.
A challenging debugging scenario I encountered was when a React application was intermittently crashing due to unexpected side effects in an asynchronous operation. Specifically, a useEffect hook was triggering a race condition with multiple rapid API calls. My debugging toolkit, which included React DevTools, console logging, and Redux DevTools, helped identify the problem. Using console.log, I traced the sequence of events and confirmed the race condition. React DevTools allowed me to monitor component state changes in real-time, while Redux DevTools provided insights into dispatched actions and their payloads. By combining these tools, I identified that the issue stemmed from overlapping API calls during rapid state updates

d) What are some common gotchas or pitfalls you've encountered when working with Next.js and React Server Components, and how do you proactively avoid them?
Pitfall: Fetching data in Client Components.

Solution: Clearly separate SCs and CCs.
Pitfall: Incorrect server-side authentication handling.

Solution: Use middleware for consistent auth checks.

## System Design Scenario

Design a high-level architecture for a real-time dashboard that displays various metrics from multiple data sources. The dashboard needs to:
- Update in real-time
- Handle user authentication
- Be performance optimized
- Support different view permissions
- Be optimized for developer productivity and maintenance

Your design should include:
1. Component structure
2. Data fetching strategy
3. State management approach
4. Performance considerations
5. Error handling strategy

Provide diagrams or pseudo-code where appropriate to illustrate your design decisions.

High-Level Architecture for a Real-Time Dashboard
1. Component Structure
Authentication Layer: Handles user login/logout and access control.
AuthContext: Manages authentication state and permissions.
Dashboard Layout:
Header: Displays user info and navigation.
Sidebar: Displays navigation options based on permissions.
MainPanel: Displays metrics visualizations (charts/tables).
Data Widgets:
MetricCard: Displays individual metric.
GraphWidget: Displays chart visualizations for real-time data.
Error/Loading States:
ErrorBoundary: Handles uncaught rendering errors.

src/
├── components/
│   ├── Auth/
│   │   └── AuthContext.js
│   ├── Dashboard/
│   │   ├── Header.js
│   │   ├── Sidebar.js
│   │   └── MainPanel.js
│   ├── Widgets/
│   │   ├── MetricCard.js
│   │   └── GraphWidget.js
│   └── ErrorBoundary.js

2. Data Fetching Strategy
WebSocket for Real-Time Updates:

Establish WebSocket connections for streaming real-time data to the frontend.
Handle reconnections and authentication tokens when needed.
Fallback for Polling:

Use periodic polling if WebSocket is unavailable.
Example with WebSocket:

3. State Management Approach
Use React Context + TanStack Query:
React Context for authentication and permissions state.
TanStack Query for server data caching and reactivity.


4. Performance Considerations
Code Splitting:
Use React.lazy and Suspense for dynamic imports of large widgets.
Memoization:
Leverage React.memo to avoid unnecessary renders.
WebSocket Throttling:
Limit updates to UI only when meaningful changes occur.
Caching with TanStack Query:
Minimize redundant API calls by leveraging stale-while-revalidate strategies.

5. Error Handling Strategy
ErrorBoundary:
Wrap critical UI components with ErrorBoundary to catch unexpected crashes. Example:

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) return <div>Something went wrong</div>;
    return this.props.children;
  }
}

## Submission Guidelines

1. Write your answers directly in this markdown file
2. Use code blocks for any code examples
3. Include diagrams as ASCII art or links to images
4. Commit your changes to your solution branch
5. Push your changes before starting the coding assessment

## Evaluation Criteria

Your written assessment will be evaluated based on:
- Technical accuracy
- Depth of understanding
- Clarity of communication
- Real-world applicability
- Strategic thinking
- Best practices awareness