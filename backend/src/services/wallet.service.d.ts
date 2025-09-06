export declare function creditWallet(userId: string, amount: number): Promise<{
    success: boolean;
    newBalance: any;
}>;
export declare function debitWallet(userId: string, amount: number): Promise<{
    success: boolean;
    balance: number;
}>;
