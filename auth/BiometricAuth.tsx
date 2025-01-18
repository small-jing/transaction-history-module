import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useAuth } from "./AuthContext";
import { useNavigation } from "@react-navigation/native";

const BiometricAuth = () => {
  const navigation = useNavigation();
  const [biometricSupported, setBiometricSupported] = useState<boolean | null>(
    null
  );
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const { login } = useAuth();

  // Check if biometric authentication is supported on the device
  const checkBiometricSupport = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const types =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (compatible) {
        setBiometricSupported(true);
        if (
          types.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
          )
        ) {
          setBiometricType("Face ID");
        } else if (
          types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
        ) {
          setBiometricType("Touch ID");
        }
      } else {
        setBiometricSupported(false);
      }
    } catch (error) {
      console.error("Error checking biometric availability:", error);
      Alert.alert("Error", "Error checking biometric availability");
    }
  };

  // Authenticate the user using biometric (Face ID/Touch ID)
  const authenticateUser = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage:
          biometricType === "Face ID"
            ? "Authenticate with Face ID"
            : "Authenticate with Touch ID",
        fallbackLabel: "Use Passcode", // Customize the fallback button label
      });

      if (result.success) {
        login();
        // router.push("/(tabs)");
        navigation.navigate("(tabs)");
      } else {
        // Log the authentication result for debugging
        console.log("Authentication failed:", result);
        Alert.alert("Authentication failed", "Failed to authenticate");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      Alert.alert("Error", "There was an error during authentication");
    }
  };

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Biometric Authentication Example</Text>
      {biometricSupported === null ? (
        <Text>Checking for biometric support...</Text>
      ) : biometricSupported ? (
        <View>
          <Text>Biometric Type: {biometricType}</Text>
          <Button
            title={`Authenticate with ${
              biometricType === "Face ID" ? "Face ID" : "Touch ID"
            }`}
            onPress={authenticateUser}
          />
        </View>
      ) : (
        <Text>Biometric authentication is not supported on this device</Text>
      )}
    </View>
  );
};

export default BiometricAuth;
