import {  useWallet } from '@aptos-labs/wallet-adapter-react';

const WalletConnectButton = () => {
    const { connect, disconnect, account, connected } = useWallet();

    const handleConnect = async () => {
        try {
            // Change below to the desired wallet name instead of "Petra"
            connect("Petra" as any); 
            console.log('Connected to wallet:', account);
        } catch (error) {
            console.error('Failed to connect to wallet:', error);
        }
    };

    const handleDisconnect = async () => {
        try {
            disconnect();
            console.log('Disconnected from wallet');
        } catch (error) {
            console.error('Failed to disconnect from wallet:', error);
        }
    };

    return (
        <div>
            <h1>Aptos Wallet Connection</h1>
            <div>
                {connected ? (
                    <div>
                        <p>Connected to: {String(account?.address)}</p>
                        <button onClick={handleDisconnect}>Disconnect</button>
                    </div>
                ) : (
                    <button onClick={handleConnect}>Connect Wallet</button>
                )}
            </div>
        </div>
    );
};

export default WalletConnectButton;