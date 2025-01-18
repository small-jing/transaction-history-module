import dayjs from "dayjs";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TransactionType, TransactionStatus } from "@/constants/Constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Transaction } from "@/interface/interface";

const TransactionItem: React.FC<{ item: Transaction }> = ({ item }) => {
  const goToDetail = () => {
    router.push({
      pathname: "/transaction-detail",
      params: {
        amount: item.amount,
        type: item.type,
        transactionId: item.transactionId,
        transactionDateTime: item.transactionDateTime,
        description: item.description,
        status: item.status,
        transactionName: item.transactionName,
      },
    });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <View style={styles.transactionItem}>
        <View>
          <MaterialCommunityIcons
            name={
              item.type === TransactionType.CREDIT
                ? "bank-transfer-in"
                : "bank-transfer-out"
            }
            size={24}
            color={item.type === TransactionType.CREDIT ? "green" : "#B22222"}
          />
        </View>
        <View style={styles.itemContainer}>
          <View>
            <Text>{item.transactionName}</Text>
            <Text>
              {dayjs(item.transactionDateTime).format("hh:mm A")}{" "}
              <Text
                style={{
                  color: "#B22222",
                  fontWeight: "bold",
                }}
              >
                {item.status === TransactionStatus.FAIL
                  ? `• ${item.status}`
                  : ""}
              </Text>
            </Text>
          </View>
          <Text>
            {item.type === TransactionType.CREDIT ? "+" : "-"}RM
            {item.amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionItem: {
    flexDirection: "row",
    backgroundColor: "#CCCCFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
    alignItems: "center",
  },
});
