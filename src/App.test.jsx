import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides matching matchers like toBeInTheDocument
import App from './App';

test('renders the main underwriting platform heading', () => {
  // Render the App component into a virtual DOM block
  render(<App />);
  
  // Search the virtual DOM for the main heading text from your App.jsx
  const headingElement = screen.getByText(/Title Insurance & Risk Underwriting Platform/i);
  
  // Assert that the heading actually exists on the page
  expect(headingElement).toBeInTheDocument();
});
