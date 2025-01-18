import dayjs from "dayjs";
import { useState } from "react";
import Toast from "@/components/Toast";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { TransactionType, TransactionStatus } from "@/constants/Constants";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const TransactionDetails = () => {
  const {
    amount,
    type,
    transactionId,
    transactionDateTime,
    description,
    status,
    transactionName,
  } = useLocalSearchParams();

  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(transactionId as string);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.main}>
        <View style={styles.amountView}>
          <Text style={styles.amount}>
            {type === TransactionType.CREDIT ? "+" : "-"} RM
            {parseFloat(amount as string).toFixed(2)}
          </Text>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={
                type === TransactionType.CREDIT
                  ? "bank-transfer-in"
                  : "bank-transfer-out"
              }
              size={28}
              color="white"
            />
          </View>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.description}>
            {description} is{" "}
            <Text
              style={{
                fontWeight: "bold",
                color:
                  status === TransactionStatus.SUCCESSFUL
                    ? "#90EE90"
                    : status === TransactionStatus.FAIL
                    ? "#FA8072"
                    : status === TransactionStatus.PENDING
                    ? "#FFD700"
                    : "black",
              }}
            >
              {status}
            </Text>
          </Text>
        </View>
        <Text style={{ color: "#E2DFD2" }}>
          {dayjs(transactionDateTime as string).format("DD MMM YYYY, h:mmA")}
        </Text>
        <View style={styles.detailView}>
          <View style={styles.detail}>
            <Text style={styles.label}>Transaction Reference</Text>
            <Text style={styles.value}>{transactionName}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.label}>Transaction ID</Text>
            <View style={styles.row}>
              <Text style={styles.value}>{transactionId}</Text>
              <TouchableOpacity onPress={handleCopy}>
                <MaterialCommunityIcons
                  name="content-copy"
                  size={16}
                  color="white"
                />
              </TouchableOpacity>
              <Toast visible={showToast} message="Copied" />
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.label}>Transaction Completion Date</Text>
            <Text style={styles.value}>
              {dayjs(transactionDateTime as string).format("DD MMM YYYY")}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.detailView, styles.reportView]}>
          <Text style={[styles.value]}>Report an issue</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#4D4DFF",
    padding: 24,
    gap: 10,
  },
  amount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F5F5F5",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6B7DFF",
    alignItems: "center",
    justifyContent: "center",
  },
  amountView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionView: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "#F5F5F5",
  },
  detailView: {
    backgroundColor: "#6B7DFF",
    borderRadius: 10,
    marginTop: 16,
  },
  reportView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  detail: {
    padding: 16,
  },
  label: {
    color: "#E2DFD2",
    marginBottom: 4,
  },
  value: {
    color: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
});
