import dayjs from "dayjs";
import { useState } from "react";
import * as Random from "expo-random";
import userData from "@/assets/data/user.json";
import DateSection from "@/components/DateSection";
import { Transaction } from "@/interface/interface";
import transactionData from "@/assets/data/transactions.json";
import { TransactionStatus, TransactionType } from "@/constants/Constants";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Text, StyleSheet, View, FlatList, RefreshControl } from "react-native";

const TransactionsScreen = () => {
  const transactions: { date: string; transactions: Transaction[] }[] =
    transactionData as { date: string; transactions: Transaction[] }[];

  const [transactionDataState, setTransactionDataState] =
    useState(transactions);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTransactions();

    // reset refresh state to false
    setRefreshing(false);
  };

  const fetchTransactions = async () => {
    try {
      // Simulate fetching new data
      const newData = await fetchUpdatedTransactions();
      setTransactionDataState(newData); // Update state with latest transaction lists
    } catch (error) {
      console.error("Error fetching data:", error);
      // TODO: should do a Toast message and shows the error
    }
  };

  const generateTransactionId = () => {
    const randomBytes = Random.getRandomBytes(16);
    const hexString = Array.from(randomBytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return `${hexString.slice(0, 8)}-${hexString.slice(
      8,
      12
    )}-${hexString.slice(12, 16)}-${hexString.slice(16, 20)}-${hexString.slice(
      20
    )}`;
  };

  const fetchUpdatedTransactions = async () => {
    // Simulate fetching new data from the JSON file, assume that we use API call
    const updatedData = [...transactions];

    // push a new sample data to the beginning of the transaction array
    updatedData[0].transactions.unshift({
      amount: 188.88,
      type: TransactionType.DEBIT,
      transactionId: generateTransactionId(),
      transactionDateTime: dayjs().format(),
      description: "Outpatient Visit",
      status: TransactionStatus.SUCCESSFUL,
      transactionName: "Outpatient Visit for Fever",
    });

    return updatedData;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.main}>
        <View style={styles.balanceView}>
          <View style={styles.balanceContainer}>
            <Text style={styles.title}>Main account</Text>
            <Text style={styles.amount}>RM{userData.balance.toFixed(2)}</Text>
          </View>
          <FlatList
            data={transactions}
            renderItem={({ item }) => (
              <DateSection date={item.date} transactions={item.transactions} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item) => item.date}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#4D4DFF",
  },
  balanceView: {
    flex: 1,
    gap: 16,
  },
  balanceContainer: {
    marginLeft: 14,
    marginTop: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F5F5F5",
  },
  amount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F5F5F5",
  },
});
