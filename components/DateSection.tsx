import TransactionItem from "./TransactionItem";
import { View, Text, StyleSheet } from "react-native";
import { DateSectionProps } from "@/interface/interface";

const DateSection: React.FC<DateSectionProps> = ({ date, transactions }) => (
  <View style={styles.dateSection}>
    <Text style={styles.dateText}>{date}</Text>
    {transactions.map((transaction) => (
      <TransactionItem key={transaction.transactionId} item={transaction} />
    ))}
  </View>
);

export default DateSection;

const styles = StyleSheet.create({
  dateSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  dateText: {
    color: "#F5F5F5",
    marginBottom: 8,
    fontWeight: "600",
  },
});
