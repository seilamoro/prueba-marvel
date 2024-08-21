import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { DataContextProvider, AppContext } from './provider';

const TestComponent = () => {
  const context = useContext(AppContext);
  return <div>{context ? 'Context is provided' : 'No context'}</div>;
};

describe('DataContextProvider', () => {
  test('provides data context', () => {
    render(
      <DataContextProvider>
        <TestComponent />
      </DataContextProvider>
    );

    const contextText = screen.getByText(/Context is provided/i);
    expect(contextText).toBeInTheDocument();
  });
});
