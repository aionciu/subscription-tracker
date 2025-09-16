# Test Suite Documentation

This directory contains comprehensive unit, integration, and component tests for the Subscription Tracker app, organized to mirror the source code structure for easy maintenance and navigation.

## Test Structure

The test structure mirrors the source code organization:

```
__tests__/
├── __mocks__/           # Shared mocks and test utilities
│   ├── testUtils.tsx    # Custom render functions with providers
│   └── mockData.ts      # Mock data for testing
├── __snapshots__/       # Jest snapshot files
├── app/                 # Tests for app routes and pages
│   ├── auth/           # Authentication flow tests
│   ├── onboarding/     # Onboarding flow tests
│   └── protected/      # Protected route tests
├── components/          # Component tests
├── hooks/              # Custom hook tests
├── services/           # Service layer tests
└── utils/              # Utility function tests
```

## Test Categories

### Component Tests (`components/`)
- **OnboardingLayout.test.tsx** - Layout component tests
- Future: AuthGuard, ThemeToggle, StableHeader tests

### Hook Tests (`hooks/`)
- **OnboardingContext.test.tsx** - Context hook tests
- Future: AuthContext, ThemeContext tests

### Service Tests (`services/`)
- Future: subscriptionService, userService, providerService tests

### Utility Tests (`utils/`)
- **validationUtils.test.ts** - Validation logic tests
- Future: userUtils, formatting utilities tests

### App Route Tests (`app/`)
- **onboarding/Onboarding.test.tsx** - Onboarding flow integration tests
- Future: auth flow, protected routes tests

## Test Utilities

### Custom Render Functions (`__mocks__/testUtils.tsx`)

```typescript
import { render, renderWithTheme, renderWithOnboarding } from '../__mocks__/testUtils';

// Render with all providers
render(<Component />);

// Render with specific providers
renderWithTheme(<Component />);
renderWithOnboarding(<Component />);
renderWithAuth(<Component />);
```

### Mock Data (`__mocks__/mockData.ts`)

Pre-configured mock data for consistent testing:

```typescript
import { mockProviders, mockBillingCycles, mockUser } from '../__mocks__/mockData';
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test __tests__/components/OnboardingLayout.test.tsx

# Run tests in specific directory
npm test __tests__/hooks/
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
- **Test Match**: `__tests__/**/*.test.{js,jsx,ts,tsx}`
- **Coverage**: Includes `src/` and `app/` directories
- **Environment**: Node (for React Native testing)
- **Setup**: `jest.setup.js` for global test configuration

### Mocked Dependencies
- **Expo Router**: Navigation functions
- **Supabase**: Database operations
- **AsyncStorage**: Local storage
- **React Native Reanimated**: Animations
- **React Native Gesture Handler**: Gestures
- **React Native Safe Area Context**: Safe areas
- **NativeWind**: Styling

## Writing New Tests

### 1. Choose the Right Location
- **Components**: `__tests__/components/ComponentName.test.tsx`
- **Hooks**: `__tests__/hooks/hookName.test.tsx`
- **Services**: `__tests__/services/serviceName.test.tsx`
- **Utils**: `__tests__/utils/utilityName.test.tsx`
- **App Routes**: `__tests__/app/routeName/PageName.test.tsx`

### 2. Use Test Utilities
```typescript
import { render, screen } from '../__mocks__/testUtils';
import { mockProviders } from '../__mocks__/mockData';

test('renders component correctly', () => {
  render(<Component data={mockProviders} />);
  expect(screen.getByText('Expected Text')).toBeOnTheScreen();
});
```

### 3. Follow Naming Conventions
- Test files: `ComponentName.test.tsx`
- Test descriptions: `describe('ComponentName', () => { ... })`
- Test cases: `test('should do something specific', () => { ... })`

## Test Coverage Goals

- **Statements**: > 80%
- **Branches**: > 80%
- **Functions**: > 80%
- **Lines**: > 80%

## Best Practices

1. **Mock External Dependencies**: All Supabase calls, navigation, and external APIs
2. **Use TestID Props**: Critical UI elements should have testID for reliable selection
3. **Test Both Success and Error Cases**: Include error scenarios and edge cases
4. **Use Descriptive Test Names**: Clear, specific test descriptions
5. **Group Related Tests**: Use `describe` blocks for logical grouping
6. **Async Testing**: Use `waitFor` for async operations
7. **Snapshot Testing**: Use for UI consistency when appropriate

## Debugging Tests

1. Use `console.log()` for debugging test output
2. Use `--verbose` flag for detailed test output
3. Use `--no-cache` if tests seem stale
4. Check Jest configuration for proper mocking

## Future Enhancements

- [ ] Add E2E tests with Detox
- [ ] Add performance testing
- [ ] Add accessibility testing
- [ ] Add visual regression testing
- [ ] Expand error scenario coverage
- [ ] Add integration tests for complete user flows

## Migration from Old Structure

The old `tests/` directory has been reorganized into this new structure:

- `tests/OnboardingLayout.test.tsx` → `__tests__/components/OnboardingLayout.test.tsx`
- `tests/OnboardingContext.test.tsx` → `__tests__/hooks/OnboardingContext.test.tsx`
- `tests/validationUtils.test.ts` → `__tests__/utils/validationUtils.test.ts`
- `tests/Onboarding.test.tsx` → `__tests__/app/onboarding/Onboarding.test.tsx`

All existing tests have been moved and should continue to work with the new structure.
