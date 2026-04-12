import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';

// Import screens (Nanti kita buat filenya)
import HomeScreen from './src/screens/HomeScreen';
// import SearchScreen from './src/screens/SearchScreen';
// import BookmarksScreen from './src/screens/BookmarksScreen';

// Inisialisasi React Query [cite: 422]
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 menit [cite: 425, 430]
    },
  },
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* Navigasi Tab Bawah Sementara */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'Search') iconName = 'search';
              else if (route.name === 'Bookmarks') iconName = 'bookmark';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          {/* Nanti uncomment setelah file layarnya dibuat */}
          <Tab.Screen name="Home" component={HomeScreen} />
          {/* <Tab.Screen name="Search" component={SearchScreen} /> */}
          {/* <Tab.Screen name="Bookmarks" component={BookmarksScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}