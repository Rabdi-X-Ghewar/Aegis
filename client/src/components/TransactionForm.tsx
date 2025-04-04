import { useState } from "react";
import { Label } from "./ui/label";
import { Send, Wallet, Repeat } from "lucide-react";
import { truncateAddress } from "../lib/utils";
import { Input } from "./ui/input";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { getWalletForOCID } from "../apiClient";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export const TransactionForm = ({ 
    senderAddress, 
    senderName = null,
    setDestinationAddress, 
    setAmount, 
    setOpen, 
    sendTransaction 
}: { 
    senderAddress: string;
    senderName?: string | null;
    setDestinationAddress: (address: string) => void;
    setAmount: (amount: string) => void;
    setOpen: (isOpen: boolean) => void;
    sendTransaction: () => Promise<void>;
}) => {
    const [addressType, setAddressType] = useState<'address' | 'ocid'>('address');
    const [destinationAddress, setDestination] = useState('');
    const [ocid, setOcid] = useState('');
    const [amount, setAmountValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resolvedAddress, setResolvedAddress] = useState<string | null>(null);
    
    const handleOcidLookup = async () => {
        if (!ocid.trim()) {
            setError("Please enter an OCID");
            return;
        }
        
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await getWalletForOCID(ocid);
            
            if (!result.success) {
                setError(result.error || "Failed to retrieve wallet address");
                setResolvedAddress(null);
                return;
            }
            
            setResolvedAddress(result.walletAddress);

        } catch (error) {
            setError("An error occurred while looking up the OCID");
            setResolvedAddress(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendTransaction = () => {
        // Use resolved address if OCID was selected, otherwise use directly entered address
        const finalDestination = addressType === 'ocid' ? resolvedAddress : destinationAddress;
        console.log("Final Destination:", finalDestination);
        if (!finalDestination) {
            setError("No valid destination address");
            return;
        }
        
        setDestinationAddress(finalDestination);
        setAmount(amount);
        sendTransaction();
    };
    
    return (
        <>
            <div className="grid gap-6 py-4">
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">From</Label>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Wallet className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            {senderName && <div className="font-mono text-sm">{senderName}</div>}
                            <span className="font-mono text-sm">
                                {truncateAddress(senderAddress)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label className="text-sm font-medium">Destination Type</Label>
                    <RadioGroup 
                        value={addressType} 
                        onValueChange={(value: string) => {
                            setAddressType(value as 'address' | 'ocid');
                            setError(null);
                            setResolvedAddress(null);
                        }}
                        className="flex gap-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="address" id="address" />
                            <Label htmlFor="address">Wallet Address</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ocid" id="ocid" />
                            <Label htmlFor="ocid">OCID</Label>
                        </div>
                    </RadioGroup>
                </div>

                {addressType === 'address' ? (
                    <div className="grid gap-2">
                        <Label htmlFor="destination" className="text-sm font-medium">
                            Destination Address
                        </Label>
                        <Input
                            id="destination"
                            placeholder="0x..."
                            value={destinationAddress}
                            onChange={(e) => setDestination(e.target.value)}
                            className="font-mono"
                        />
                    </div>
                ) : (
                    <div className="grid gap-2">
                        <Label htmlFor="ocid" className="text-sm font-medium">
                            OCID
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="ocid"
                                placeholder="Enter OCID"
                                value={ocid}
                                onChange={(e) => setOcid(e.target.value)}
                                className="font-mono"
                            />
                            <Button 
                                type="button" 
                                onClick={handleOcidLookup}
                                disabled={isLoading || !ocid.trim()}
                                size="sm"
                            >
                                <Repeat className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                                <span className="ml-2">Lookup</span>
                            </Button>
                        </div>
                        
                        {resolvedAddress && (
                            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                                <span className="text-xs font-medium text-green-800">Resolved address: </span>
                                <span className="text-xs font-mono">{truncateAddress(resolvedAddress)}</span>
                            </div>
                        )}
                        
                        {error && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                                <span className="text-xs text-red-600">{error}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="grid gap-2">
                    <Label htmlFor="amount" className="text-sm font-medium">
                        Amount (ETH)
                    </Label>
                    <div className="relative">
                        <Input
                            id="amount"
                            type="number"
                            placeholder="0.0"
                            value={amount}
                            onChange={(e) => setAmountValue(e.target.value)}
                            className="pr-12"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            ETH
                        </div>
                    </div>
                </div>
            </div>

            <DialogFooter>
                <Button
                    variant="ghost"
                    onClick={() => {
                        setOpen(false);
                        setDestinationAddress("");
                        setAmount("");
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSendTransaction}
                    disabled={(addressType === 'ocid' && !resolvedAddress) || isLoading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                    <Send className="w-4 h-4 mr-2" />
                    Send Transaction
                </Button>
            </DialogFooter>
        </>
    );
};