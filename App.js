// App.js

import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./screens/OnboardingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SignInScreen from "./screens/SignInScreen"; 
import VisualizeExpensesScreen from "./screens/VisualizeExpensesScreen";
import DashboardScreen from "./screens/DashboardScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding" headerMode="none">
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} /> 
          <Stack.Screen name="SignIn" component={SignInScreen} /> 
          <Stack.Screen name="VisualizeExpenses" component={VisualizeExpensesScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
