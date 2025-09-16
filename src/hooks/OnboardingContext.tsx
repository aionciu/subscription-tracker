import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Provider } from '../types/provider';
import { Subscription } from '../types/subscription';
import { User } from '../types/user';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  steps: OnboardingStep[];
  profileData: Partial<User>;
  selectedProviders: Provider[];
  subscriptions: Partial<Subscription>[];
  isCompleted: boolean;
  isLoading: boolean;
}

export interface OnboardingContextType {
  state: OnboardingState;
  updateProfileData: (data: Partial<User>) => void;
  updateSelectedProviders: (providers: Provider[]) => void;
  updateSubscriptions: (subscriptions: Partial<Subscription>[]) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (stepIndex: number) => void;
  setCurrentStepByRoute: (routeName: string) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  setLoading: (loading: boolean) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

const initialSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    description: 'Let\'s get you started',
    completed: false,
  },
  {
    id: 'profile',
    title: 'Profile Setup',
    description: 'Set your preferences',
    completed: false,
  },
  {
    id: 'providers',
    title: 'Select Providers',
    description: 'Choose your subscriptions',
    completed: false,
  },
  {
    id: 'setup',
    title: 'Quick Setup',
    description: 'Add subscription details',
    completed: false,
  },
  {
    id: 'complete',
    title: 'Complete',
    description: 'You\'re all set!',
    completed: false,
  },
];

const initialState: OnboardingState = {
  currentStep: 0,
  totalSteps: initialSteps.length,
  steps: initialSteps,
  profileData: {},
  selectedProviders: [],
  subscriptions: [],
  isCompleted: false,
  isLoading: false,
};

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>(initialState);

  const updateProfileData = useCallback((data: Partial<User>) => {
    setState(prev => ({
      ...prev,
      profileData: { ...prev.profileData, ...data },
    }));
  }, []);

  const updateSelectedProviders = useCallback((providers: Provider[]) => {
    setState(prev => ({
      ...prev,
      selectedProviders: providers,
    }));
  }, []);

  const updateSubscriptions = useCallback((subscriptions: Partial<Subscription>[]) => {
    setState(prev => ({
      ...prev,
      subscriptions: subscriptions,
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => {
      const nextStepIndex = Math.min(prev.currentStep + 1, prev.totalSteps - 1);
      const updatedSteps = [...prev.steps];
      updatedSteps[prev.currentStep] = { ...updatedSteps[prev.currentStep], completed: true };
      
      return {
        ...prev,
        currentStep: nextStepIndex,
        steps: updatedSteps,
      };
    });
  }, []);

  const previousStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
    }));
  }, []);

  const goToStep = useCallback((stepIndex: number) => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(stepIndex, prev.totalSteps - 1)),
    }));
  }, []);

  // Function to set current step based on route
  const setCurrentStepByRoute = useCallback((routeName: string) => {
    const stepMap: { [key: string]: number } = {
      'index': 0,
      'profile': 1,
      'providers': 2,
      'setup': 3,
      'complete': 4,
    };
    
    const stepIndex = stepMap[routeName] ?? 0;
    setState(prev => ({
      ...prev,
      currentStep: stepIndex,
    }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCompleted: true,
      steps: prev.steps.map(step => ({ ...step, completed: true })),
    }));
  }, []);

  const resetOnboarding = useCallback(() => {
    setState(initialState);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading,
    }));
  }, []);

  const value: OnboardingContextType = {
    state,
    updateProfileData,
    updateSelectedProviders,
    updateSubscriptions,
    nextStep,
    previousStep,
    goToStep,
    setCurrentStepByRoute,
    completeOnboarding,
    resetOnboarding,
    setLoading,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};
