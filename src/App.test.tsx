import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main div', async () => {
  render(<App />);
  const linkElement = await screen.findByTestId('appDiv');
  expect(linkElement).toBeInTheDocument();
});
