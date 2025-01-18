export interface Transaction {
  amount: number;
  type: "CREDIT" | "DEBIT";
  transactionId: string;
  transactionDateTime: string;
  description: string;
  status: "SUCCESSFUL" | "FAIL" | "PENDING";
  transactionName: string;
}

export interface DateSectionProps {
  date: string;
  transactions: Transaction[];
}

export interface ToastProps {
  visible: boolean;
  message: string;
}
