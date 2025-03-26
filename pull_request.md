# Code Refactoring for NYTimes Bestsellers Book App

## Overview

I've spent approximately 5 hours refactoring the codebase to address architectural issues, improve code reusability, and fix bugs. My main focus was on improving the structure without changing core functionality.

## What I Changed and Why

### 1. Improved State Management
- **Fixed state mutation in reducer**: The `book_removed` action was directly mutating state, which is against Redux principles. Changed to use immutable operations.
- **Improved component state management**: The `SaveButton` was maintaining its own state that could get out of sync with the Redux store. Updated to use the Redux state directly.
- **Memoized components**: Added memoization to prevent unnecessary re-renders.

### 2. Reduced Code Duplication
- **Created shared styled components**: Extracted common styled components like `Title`, `Author`, and `Description` into reusable modules.
- **Created utility functions for book operations**: Added `transformNYTBook`, `getBookId`, and `createBookSorter` functions to standardize book operations across components.
- **Created custom hooks**: Developed `useBookSorting` and `useViewMode` hooks to abstract common functionality.

### 3. Improved Component Structure
- **Added proper PropTypes**: Improved prop validation with more specific types and added default props.
- **Added documentation**: Added JSDoc comments to explain component purpose and parameters.
- **Improved error handling**: Added error states and empty states to handle edge cases.

### 4. Added Unit Tests
- **Tests for utility functions**: Added tests for the book transformation and sorting utilities.
- **Tests for custom hooks**: Added tests for the `useBookSorting` hook.

## Time Spent
- Initial analysis: 1 hour
- Creating shared components and utilities: 1.5 hours
- Refactoring components and pages: 1.5 hours
- Writing tests: 1 hour

## What I Would Focus on Next
If I were to continue working on this project, I would focus on:

1. **Performance Optimization**:
   - Implement virtualized lists for better performance with large book collections
   - Add proper loading states and skeleton screens
   - Optimize image loading with lazy loading and proper sizing

2. **State Management Improvements**:
   - Normalize the Redux store for better data access patterns
   - Add selectors for derived data
   - Add action creators with TypeScript for better type safety

3. **Testing**:
   - Add integration tests for the main user flows
   - Add end-to-end tests with Cypress
   - Improve test coverage for edge cases

4. **Accessibility**:
   - Add proper ARIA labels and roles
   - Improve keyboard navigation
   - Add proper focus management

5. **Error Handling**:
   - Add proper error boundaries
   - Improve error messaging
   - Add retry mechanisms for API calls

## Architecture Decisions
- **Kept Redux**: As requested, I maintained Redux for state management.
- **Custom Hooks vs HOCs**: I chose custom hooks over higher-order components for abstraction because they're more flexible and lead to simpler component structure.
- **Utility Functions vs Class Methods**: I chose functional utilities over class methods to maintain a functional programming style and improve testability.
- **Styled Components**: I maintained the use of styled-components for consistency with the existing codebase. 