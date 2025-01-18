import { useState } from "react";
import { Dimensions } from "react-native";
import userData from "@/assets/data/user.json";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Image, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ViewTransactionButton from "@/components/ViewTransactionButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "transparent", dark: "transparent" }}
      headerImage={
        <>
          <LinearGradient
            colors={[
              "#0000E6", // Deep blue
              "#00DDD7", // Cyan
              "#FB73FF", // Pink
            ]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          <Image
            source={require("@/assets/images/ryt-bank-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </>
      }
    >
      <View style={styles.main}>
        <View style={styles.balanceView}>
          <Text style={styles.title}>Your Balance</Text>
          <View style={styles.amountView}>
            <Text style={styles.amount}>
              {visible ? `RM${userData.balance.toFixed(2)}` : "RM****.**"}
            </Text>
            <MaterialCommunityIcons
              onPress={handleVisibility}
              name={visible ? "eye" : "eye-off"}
              size={28}
              color="white"
            />
          </View>
        </View>
        <ViewTransactionButton />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logo: {
    width: windowWidth * 0.8, // 80% of screen width
    height: windowHeight * 0.2,
    bottom: 0,
    left: 20,
    position: "absolute",
  },
  main: {
    flex: 1,
    gap: 35,
    alignItems: "center",
  },
  balanceView: {
    flex: 1,
    gap: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F5F5F5",
  },
  amountView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  amount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F5F5F5",
  },
});
