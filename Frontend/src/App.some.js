import { render, screen } from '@testing-library/react';
import App from './App';

test('renders URL Shortening Service title', () => {
  render(<App />);
  const linkElement = screen.getByText(/URL Shortening Service/i);
  expect(linkElement).toBeInTheDocument();
});
