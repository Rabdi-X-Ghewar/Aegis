import { WalletBalance } from "../lib/types";
import { TransactionForm } from "./TransactionForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export const TransactionDialog = ({
    open,
    setOpen,
    selectedWallet,
    setDestinationAddress,
    setAmount,
    sendTransaction
}: {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
    selectedWallet: WalletBalance | undefined;
    setDestinationAddress: (address: string) => void;
    setAmount: (amount: string) => void;
    sendTransaction: () => Promise<void>;
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Send Transaction</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Send ETH to another wallet address. Please verify all details before confirming.
                    </DialogDescription>
                </DialogHeader>

                <TransactionForm
                    senderAddress={selectedWallet?.address || ""}
                    setDestinationAddress={setDestinationAddress}
                    setAmount={setAmount}
                    setOpen={setOpen}
                    sendTransaction={sendTransaction}
                />
            </DialogContent>
        </Dialog>
    );
};
