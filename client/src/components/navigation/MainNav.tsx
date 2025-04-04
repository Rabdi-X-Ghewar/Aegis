import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { UserCircle, WalletIcon } from "lucide-react"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import { Button } from "../ui/button"
import { useCreateWallet } from '@privy-io/react-auth';
import { createWalletClient, custom, Hex, parseEther } from 'viem';
import { sepolia } from 'viem/chains';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
    linkWalletToOCID, 
    getWalletForOCID, 
    unlinkWalletFromOCID
} from "../..//apiClient";
import { createLinkingMessage, formatWalletAddress } from "../../lib/utils";



export function MainNav() {
    const { linkWallet } = usePrivy();
    const { wallets } = useWallets();
    const { createWallet } = useCreateWallet();
    const { isInitialized, authState, ocAuth, OCId } = useOCAuth();
    const [linkedWalletAddress, setLinkedWalletAddress] = useState<string | null>(null);
    const [selectedWalletIndex, setSelectedWalletIndex] = useState<number | null>(null);
    const [isLinking, setIsLinking] = useState(false);
    const [selectedSigningWalletIndex, setSelectedSigningWalletIndex] = useState<number | null>(null);
    const [linkError, setLinkError] = useState<string | null>(null);

    // Fetch linked wallet on component mount if user is authenticated
    useEffect(() => {
        if (authState?.isAuthenticated && OCId) {
            fetchLinkedWallet();
        }
    }, [authState?.isAuthenticated, OCId]);

    // Set the first wallet as default for signing if available
    useEffect(() => {
        if (wallets.length > 0 && selectedSigningWalletIndex === null) {
            setSelectedSigningWalletIndex(0);
        }
    }, [wallets, selectedSigningWalletIndex]);

    const fetchLinkedWallet = async () => {
        if (!OCId) return;
        
        try {
            const response = await getWalletForOCID(OCId);
            if (response.success && response.walletAddress) {
                setLinkedWalletAddress(response.walletAddress);
            } else {
                setLinkedWalletAddress(null);
            }
        } catch (error) {
            console.error('Error fetching linked wallet:', error);
        }
    };

    const sign = async () => {
        if (selectedSigningWalletIndex === null || !wallets[selectedSigningWalletIndex]) {
            console.error('No wallet selected for signing');
            return;
        }
        
        const wallet = wallets[selectedSigningWalletIndex];
        const provider = await wallet?.getEthereumProvider();
        const address = wallet?.address;
        
        if (!provider || !address) {
            console.error('Provider or address not available');
            return;
        }
        
        const message = 'This is the message I am signing';
        
        try {
            const signature = await provider?.request({
                method: 'personal_sign',
                params: [message, address],
            });
            console.log('Signature:', signature);
            console.log('Signed with wallet:', address);
        } catch (error) {
            console.error('Error signing message:', error);
        }
    }

    const handleWalletSelect = (index: string) => {
        setSelectedWalletIndex(parseInt(index));
        setLinkError(null);
    };
    
    const handleSigningWalletSelect = (index: string) => {
        setSelectedSigningWalletIndex(parseInt(index));
    };

    const linkWalletToOCIDHandler = async () => {
        if (!OCId || selectedWalletIndex === null || selectedWalletIndex >= wallets.length) {
            setLinkError('OCID not available or invalid wallet selection');
            return;
        }

        setIsLinking(true);
        setLinkError(null);
        
        try {
            const selectedWallet = wallets[selectedWalletIndex];
            const provider = await selectedWallet?.getEthereumProvider();
            const address = selectedWallet?.address;
            
            if (!provider || !address) {
                setLinkError('Provider or address not available');
                setIsLinking(false);
                return;
            }

            // Create a message that includes the OCID to establish the link
            const { message, timestamp } = createLinkingMessage(address, OCId);
            
            // Sign the message to prove ownership of the wallet
            const signature = await provider?.request({
                method: 'personal_sign',
                params: [message, address],
            });

            // Send the signed message, address, and OCID to the backend
            const response = await linkWalletToOCID({
                ocid: OCId,
                walletAddress: address,
                signature,
                message,
                timestamp
            });

            if (response.success) {
                setLinkedWalletAddress(address);
                console.log(`Successfully linked wallet ${address} to OCID ${OCId}`);
            } else {
                setLinkError(response.error || 'Failed to link wallet');
                console.error('Failed to link wallet:', response.error);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setLinkError(errorMessage);
            console.error('Error linking wallet to OCID:', error);
        } finally {
            setIsLinking(false);
        }
    };

    const unlinkWallet = async () => {
        if (!OCId || !linkedWalletAddress) return;
        
        try {
            const response = await unlinkWalletFromOCID(OCId);
            if (response.success) {
                setLinkedWalletAddress(null);
                setSelectedWalletIndex(null);
            } else {
                console.error('Error unlinking wallet:', response.error);
            }
        } catch (error) {
            console.error('Error unlinking wallet:', error);
        }
    };

    const transaction = async () => {
        if (selectedSigningWalletIndex === null || !wallets[selectedSigningWalletIndex]) {
            console.error('No wallet selected for transaction');
            return;
        }
        
        const wallet = wallets[selectedSigningWalletIndex];
        
        try {
            await wallet?.switchChain(sepolia.id);

            const provider = await wallet?.getEthereumProvider();
            if (!provider) {
                console.error('Ethereum provider is undefined');
                return;
            }
            
            const walletClient = createWalletClient({
                account: wallet?.address as Hex,
                chain: sepolia,
                transport: custom(provider),
            });
            
            const [address] = await walletClient.getAddresses();

            const hash = await walletClient.sendTransaction({
                account: address,
                to: '0x1029BBd9B780f449EBD6C74A615Fe0c04B61679c',
                value: parseEther('0.0001')
            });

            console.log('Transaction hash:', hash);
        } catch (error) {
            console.error('Error sending transaction:', error);
        }
    }

    const handleOCLogin = () => {
        if (ocAuth) {
            ocAuth.signInWithRedirect({ state: 'opencampus-student' });
        }
    };

    const handleOCLogout = () => {
        localStorage.removeItem('oc-token-storage');
        setLinkedWalletAddress(null);
        setSelectedWalletIndex(null);
        window.location.reload();
    };

    return (
        <nav className="flex justify-between w-full px-2">
            <div className="flex items-center space-x-6">
            </div>

            <div className="flex items-center space-x-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                            <UserCircle />
                            <span>Account</span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-fit px-4 py-2">
                        {isInitialized && (
                            <>
                                {authState.error ? (
                                    <DropdownMenuItem>
                                        <span className="text-destructive">Error: {authState.error.message}</span>
                                    </DropdownMenuItem>
                                ) : authState.isAuthenticated ? (
                                    <>
                                        <DropdownMenuItem>
                                            <div className="flex flex-col space-y-3 w-64">
                                                <span className="font-semibold">OCConnect ID:</span>
                                                <span className="text-sm text-muted-foreground">{OCId}</span>
                                                
                                                {linkedWalletAddress ? (
                                                    <>
                                                        <div className="pt-2 border-t">
                                                            <span className="font-semibold">Linked ETH Address:</span>
                                                            <span className="text-sm text-muted-foreground block mt-1 break-all">
                                                                {linkedWalletAddress}
                                                            </span>
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm" 
                                                                className="mt-2"
                                                                onClick={unlinkWallet}
                                                            >
                                                                Unlink Wallet
                                                            </Button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="pt-2 border-t">
                                                        <span className="font-semibold mb-2 block">Link a wallet to OCID:</span>
                                                        {wallets.length > 0 ? (
                                                            <>
                                                                <Select onValueChange={handleWalletSelect}>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select wallet" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {wallets.map((wallet, index) => (
                                                                            <SelectItem key={index} value={index.toString()}>
                                                                                {formatWalletAddress(wallet.address)}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                {linkError && (
                                                                    <div className="text-sm text-destructive mt-1">
                                                                        {linkError}
                                                                    </div>
                                                                )}
                                                                <Button 
                                                                    className="w-full mt-2"
                                                                    onClick={linkWalletToOCIDHandler}
                                                                    disabled={selectedWalletIndex === null || isLinking}
                                                                >
                                                                    {isLinking ? "Linking..." : "Link Wallet"}
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <div className="text-sm text-muted-foreground">
                                                                No wallets connected. Please connect a wallet first.
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleOCLogout}>
                                            <Button variant="outline" className="w-full">Logout</Button>
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <DropdownMenuItem onClick={handleOCLogin}>
                                        <Button variant="outline" className="w-full">Login with OCConnect</Button>
                                    </DropdownMenuItem>
                                )}
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                        <WalletIcon />
                        <span>Wallets</span>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit px-4 py-2">
                    <DropdownMenuItem>
                        <div className="flex flex-col space-y-3 w-64">
                            <span className="font-semibold">Connected Wallets:</span>
                            {wallets.length > 0 ? (
                                wallets.map((wallet, index) => (
                                    <span key={index} className="text-sm text-muted-foreground">
                                        {wallet.walletClientType} - {formatWalletAddress(wallet.address)}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-muted-foreground">No wallets connected</span>
                            )}
                            
                            {wallets.length > 0 && (
                                <div className="pt-2 border-t">
                                    <span className="font-semibold mb-2 block">Select wallet for operations:</span>
                                    <Select 
                                        value={selectedSigningWalletIndex !== null ? selectedSigningWalletIndex.toString() : undefined} 
                                        onValueChange={handleSigningWalletSelect}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select wallet" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {wallets.map((wallet, index) => (
                                                <SelectItem key={index} value={index.toString()}>
                                                    {wallet.walletClientType} - {formatWalletAddress(wallet.address)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={linkWallet}>
                        <Button variant="outline" className="w-full">Link Another Wallet</Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={createWallet}>
                        <Button variant="outline" className="w-full">Create Wallet</Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={sign}>
                        <Button 
                            className="w-full"
                            disabled={selectedSigningWalletIndex === null}
                        >
                            Sign
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={transaction}>
                        <Button 
                            className="w-full"
                            disabled={selectedSigningWalletIndex === null}
                        >
                            Send
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}