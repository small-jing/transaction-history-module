import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ViewTransactionButton = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/transactions")}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="card-text" size={24} color="white" />
      </View>
      <Text style={styles.text}>View transactions</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 140,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6B7DFF",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 8,
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default ViewTransactionButton;
