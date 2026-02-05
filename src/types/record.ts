export type RecordInput = {
    type: "INCOME" | "EXPENSE";
    amount: number;
    description?: string;
    category: string;
    date: string;
};
