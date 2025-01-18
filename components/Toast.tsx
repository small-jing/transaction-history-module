import { useState, useEffect } from "react";
import { ToastProps } from "@/interface/interface";
import { View, Text, Animated, StyleSheet } from "react-native";

const Toast: React.FC<ToastProps> = ({ visible, message }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // Wait for 2 seconds
        Animated.delay(2000),
        // Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: "-40%",
    left: "72%",
    alignSelf: "center",
    backgroundColor: "#50C878",
    padding: 10,
    borderRadius: 25,
    zIndex: 1000,
  },
  toastText: {
    color: "#000",
    fontSize: 12,
  },
});
