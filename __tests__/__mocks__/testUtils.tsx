import { render, RenderOptions } from '@testing-library/react-native';
import React from 'react';

// Simple mock providers for testing
const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="theme-provider">{children}</div>
);

const MockOnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="onboarding-provider">{children}</div>
);

const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="auth-provider">{children}</div>
);

// Combined test wrapper with all providers
const AllProvidersWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MockThemeProvider>
    <MockAuthProvider>
      <MockOnboardingProvider>
        {children}
      </MockOnboardingProvider>
    </MockAuthProvider>
  </MockThemeProvider>
);

// Custom render function with providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProvidersWrapper, ...options });

// Individual provider wrappers for specific tests
export const renderWithTheme = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: MockThemeProvider, ...options });

export const renderWithOnboarding = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: MockOnboardingProvider, ...options });

export const renderWithAuth = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: MockAuthProvider, ...options });

// Re-export everything
export * from '@testing-library/react-native';
export { customRender as render };

