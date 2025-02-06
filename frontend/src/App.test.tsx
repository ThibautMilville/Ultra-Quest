import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('App Integration Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('fetches and displays hello message from backend', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('Hello World!'),
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Message from backend: Hello World!')).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000');
  });

  it('handles backend error gracefully', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });
});