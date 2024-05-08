import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Import your screens with their types (assuming they are typed)
import HomeScreen from './screens/HomeScreen'; // Assuming HomeScreen is a TypeScript component
import EmprestimoScreen from './screens/EmprestimoScreen';
import DevolucaoScreen from './screens/DevolucaoScreen';
import DetalhesScreen from './screens/DetalhesScreen';


const Stack = createStackNavigator();
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="EmprestimoScreen" component={EmprestimoScreen} />
          <Stack.Screen name="DevolucaoScreen" component={DevolucaoScreen} />
          <Stack.Screen name="DetalhesScreen" component={DetalhesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
