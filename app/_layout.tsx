import "react-native-reanimated";
import { useEffect } from "react";
// import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { AppTheme } from "@/assets/theme/AppTheme";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { AuthProvider } from "@/auth/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./(pages)/login";
import HomeScreen from "./(tabs)";
import TransactionsScreen from "./(pages)/transactions";
import TransactionDetails from "./(pages)/transaction-detail";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabNavigator from "@/components/TabNavigator";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName="(pages)/login">
        <Stack.Screen
          name="(pages)/login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(tabs)"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(pages)/transactions"
          component={TransactionsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(pages)/transaction-detail"
          component={TransactionDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </AuthProvider>
  );
}
