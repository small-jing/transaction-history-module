import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const AppTheme = {
  ...DefaultTheme, // Start with the default theme as a base
  colors: {
    ...DefaultTheme.colors,
    background: "#3b5aff", // Set your desired background color
    text: "#333", // Customize text color
    primary: "#6200ee", // Primary color (e.g., for buttons)
    // Add other colors as needed
  },
};
