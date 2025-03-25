import { WalletBalance } from "../lib/types";
import { EmptyWalletState } from "./EmptyWalletState";
import { WalletCard } from "./WalletCard";

export const WalletList = ({
    walletBalances,
    handleCopyAddress,
    setSelectedWallet,
    setOpen
}: {
    walletBalances: WalletBalance[];
    handleCopyAddress: (address: string) => void;
    setSelectedWallet: (wallet: WalletBalance) => void;
    setOpen: (isOpen: boolean) => void;
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {walletBalances.length > 0 ? (
                walletBalances.map((wallet, index) => (
                    <WalletCard
                        key={index}
                        wallet={wallet}
                        handleCopyAddress={handleCopyAddress}
                        setSelectedWallet={setSelectedWallet}
                        setOpen={setOpen}
                    />
                ))
            ) : (
                <EmptyWalletState />
            )}
        </div>
    );
};