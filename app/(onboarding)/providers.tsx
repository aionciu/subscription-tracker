import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { OnboardingLayout } from '../../src/components/OnboardingLayout';
import { useOnboarding } from '../../src/hooks/OnboardingContext';
import { useTheme } from '../../src/hooks/ThemeContext';
import { ProviderService } from '../../src/services/providerService';
import { ProviderWithCategory } from '../../src/types/provider';

export default function ProvidersScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { state, updateSelectedProviders, setCurrentStepByRoute, previousStep } = useOnboarding();
  
  const [providers, setProviders] = useState<ProviderWithCategory[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<ProviderWithCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomProvider, setShowCustomProvider] = useState(false);
  const [customProviderName, setCustomProviderName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set current step when component mounts
    setCurrentStepByRoute('providers');
  }, [setCurrentStepByRoute]);

  useEffect(() => {
    // Fetch providers from database
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const providersData = await ProviderService.getAllProviders();
        setProviders(providersData);
      } catch (error) {
        console.error('Error fetching providers:', error);
        // Fallback to empty array if fetch fails
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    // Update onboarding state when selections change
    updateSelectedProviders(selectedProviders);
  }, [selectedProviders, updateSelectedProviders]);

  const handleNext = () => {
    if (selectedProviders.length === 0) {
      // Skip to complete if no providers selected
      router.push('/(onboarding)/complete');
    } else {
      router.push('/(onboarding)/setup');
    }
  };

  const handleBack = () => {
    previousStep();
    router.back();
  };

  const toggleProvider = (provider: ProviderWithCategory) => {
    setSelectedProviders(prev => {
      const isSelected = prev.some(p => p.id === provider.id);
      if (isSelected) {
        return prev.filter(p => p.id !== provider.id);
      } else {
        return [...prev, provider];
      }
    });
  };

  const addCustomProvider = () => {
    if (customProviderName.trim()) {
      const customProvider: ProviderWithCategory = {
        id: `550e8400-e29b-41d4-a716-44665544${Date.now().toString().slice(-6)}`,
        name: customProviderName.trim(),
        description: 'Custom provider',
        website_url: null,
        logo_url: null,
        category_id: '550e8400-e29b-41d4-a716-446655440210', // Other category
        is_popular: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category: {
          id: '550e8400-e29b-41d4-a716-446655440210',
          name: 'Other',
          description: 'Custom providers',
          icon: null,
          color: null,
          is_active: true,
          created_at: new Date().toISOString(),
        },
      };
      setSelectedProviders(prev => [...prev, customProvider]);
      setCustomProviderName('');
      setShowCustomProvider(false);
    }
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (provider.description && provider.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const groupedProviders = filteredProviders.reduce((acc, provider) => {
    const category = provider.category?.name || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(provider);
    return acc;
  }, {} as { [key: string]: ProviderWithCategory[] });

  return (
    <OnboardingLayout
      nextButtonText={selectedProviders.length > 0 ? "Continue" : "Skip"}
      onNext={handleNext}
      onBack={handleBack}
    >
      <View className="flex-1">
        {/* Search Bar */}
        <View className="mb-6">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search providers..."
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            className={`px-4 py-3 rounded-xl border ${
              isDark 
                ? 'bg-dark-800 border-dark-700 text-dark-100' 
                : 'bg-white border-secondary-200 text-secondary-800'
            }`}
          />
        </View>

        {/* Selected Count */}
        {selectedProviders.length > 0 && (
          <View className={`p-3 rounded-xl mb-4 ${
            isDark ? 'bg-primary-900' : 'bg-primary-50'
          }`}>
            <Text className={`text-sm font-medium ${
              isDark ? 'text-primary-200' : 'text-primary-700'
            }`}>
              {selectedProviders.length} provider{selectedProviders.length > 1 ? 's' : ''} selected
            </Text>
          </View>
        )}

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {loading && (
            <View className="py-8">
              <Text className={`text-center ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                Loading providers...
              </Text>
            </View>
          )}
          
          {!loading && Object.keys(groupedProviders).length === 0 && (
            <View className="py-8">
              <Text className={`text-center ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                No providers found
              </Text>
            </View>
          )}
          
          {!loading && Object.keys(groupedProviders).length > 0 && (
            <>
              {Object.entries(groupedProviders).map(([category, providers]) => (
                <View key={category} className="mb-6">
                  <Text className={`text-lg font-semibold mb-3 ${
                    isDark ? 'text-dark-100' : 'text-secondary-800'
                  }`}>
                    {category}
                  </Text>
                  
                  <View className="space-y-2">
                    {providers.map((provider) => {
                      const isSelected = selectedProviders.some(p => p.id === provider.id);
                      return (
                        <TouchableOpacity
                          key={provider.id}
                          onPress={() => toggleProvider(provider)}
                          className={`flex-row items-center justify-between p-4 rounded-xl border-2 ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50'
                              : isDark 
                                ? 'border-dark-700 bg-dark-800' 
                                : 'border-secondary-200 bg-white'
                          }`}
                        >
                          <View className="flex-row items-center flex-1">
                            <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                              isDark ? 'bg-dark-700' : 'bg-secondary-100'
                            }`}>
                              <Text className="text-xl">
                                {provider.name?.charAt(0) || '?'}
                              </Text>
                            </View>
                            <View className="flex-1">
                              <Text className={`text-base font-medium mb-1 ${
                                isDark ? 'text-dark-100' : 'text-secondary-800'
                              }`}>
                                {provider.name || 'Unknown Provider'}
                              </Text>
                              <Text className={`text-sm ${
                                isDark ? 'text-dark-400' : 'text-secondary-500'
                              }`}>
                                {provider.description || 'No description available'}
                              </Text>
                            </View>
                          </View>
                          
                          {isSelected && (
                            <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center">
                              <Text className="text-white text-sm">✓</Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Custom Provider */}
          <View className="mb-6">
            <Text className={`text-lg font-semibold mb-3 ${
              isDark ? 'text-dark-100' : 'text-secondary-800'
            }`}>
              Custom Provider
            </Text>
            
            {!showCustomProvider ? (
              <TouchableOpacity
                onPress={() => setShowCustomProvider(true)}
                className={`flex-row items-center justify-center p-4 rounded-xl border-2 border-dashed ${
                  isDark ? 'border-dark-600 bg-dark-800' : 'border-secondary-300 bg-secondary-50'
                }`}
              >
                <Text className="text-2xl mr-3">+</Text>
                <Text className={`text-base font-medium ${
                  isDark ? 'text-dark-300' : 'text-secondary-600'
                }`}>
                  Add Custom Provider
                </Text>
              </TouchableOpacity>
            ) : (
              <View className={`p-4 rounded-xl ${
                isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-secondary-200'
              } border`}>
                <TextInput
                  value={customProviderName}
                  onChangeText={setCustomProviderName}
                  placeholder="Enter provider name..."
                  placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
                  className={`px-3 py-2 rounded-lg border mb-3 ${
                    isDark 
                      ? 'bg-dark-700 border-dark-600 text-dark-100' 
                      : 'bg-white border-secondary-200 text-secondary-800'
                  }`}
                />
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    onPress={addCustomProvider}
                    className="flex-1 bg-primary-500 py-2 rounded-lg"
                  >
                    <Text className="text-white text-center font-medium">Add</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowCustomProvider(false);
                      setCustomProviderName('');
                    }}
                    className={`flex-1 py-2 rounded-lg ${
                      isDark ? 'bg-dark-700' : 'bg-secondary-200'
                    }`}
                  >
                    <Text className={`text-center font-medium ${
                      isDark ? 'text-dark-300' : 'text-secondary-600'
                    }`}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </OnboardingLayout>
  );
}
