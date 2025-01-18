import userData from "@/assets/data/user.json";
import DateSection from "@/components/DateSection";
import transactionData from "@/assets/data/transactions.json";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const TransactionsScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.main}>
        <View style={styles.balanceView}>
          <View style={styles.balanceContainer}>
            <Text style={styles.title}>Main account</Text>
            <Text style={styles.amount}>RM{userData.balance.toFixed(2)}</Text>
          </View>
          <FlatList
            data={transactionData}
            renderItem={({ item }) => (
              <DateSection date={item.date} transactions={item.transactions} />
            )}
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
