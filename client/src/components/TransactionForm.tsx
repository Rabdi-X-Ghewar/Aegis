import { useState } from "react";
import { Label } from "./ui/label";
import { Send, Wallet, Repeat, ArrowRight } from "lucide-react";
import { truncateAddress } from "../lib/utils";
import { Input } from "./ui/input";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { getWalletForOCID } from "../apiClient";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "@/lib/utils";

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
        const finalDestination = addressType === 'ocid' ? resolvedAddress : destinationAddress;
        if (!finalDestination) {
            setError("No valid destination address");
            return;
        }
        
        setDestinationAddress(finalDestination);
        setAmount(amount);
        sendTransaction();
    };
    
    return (
        <div className="space-y-8">
            {/* Transaction Overview Section */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-sm uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Transaction Details</span>
                </div>
            </div>

            <div className="grid gap-6">
                {/* From Address Card */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-muted-foreground">From</Label>
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Wallet className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            {senderName && (
                                <div className="font-medium text-sm text-foreground">{senderName}</div>
                            )}
                            <div className="font-mono text-sm text-muted-foreground">
                                {truncateAddress(senderAddress)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Destination Section */}
                <div className="space-y-4">
                <RadioGroup 
                        value={addressType} 
                        onValueChange={(value) => {
                            setAddressType(value as 'address' | 'ocid');
                            setError(null);
                            setResolvedAddress(null);
                        }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <Label
                            htmlFor="address"
                            className={cn(
                                "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors",
                                addressType === 'address' ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
                            )}
                        >
                            <RadioGroupItem value="address" id="address" className="sr-only" />
                            <Wallet className="h-6 w-6 mb-2" />
                            <span className="font-medium">Wallet Address</span>
                        </Label>

                        <Label
                            htmlFor="ocid"
                            className={cn(
                                "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors",
                                addressType === 'ocid' ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
                            )}
                        >
                            <RadioGroupItem value="ocid" id="ocid" className="sr-only" />
                            <ArrowRight className="h-6 w-6 mb-2" />
                            <span className="font-medium">OCID</span>
                        </Label>
                    </RadioGroup>
                    {addressType === 'address' ? (
                        <div className="space-y-2">
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
                        <div className="space-y-2">
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
                                    onClick={handleOcidLookup}
                                    disabled={isLoading || !ocid.trim()}
                                    variant="outline"
                                    className="min-w-[100px]"
                                >
                                    <Repeat className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                                    Lookup
                                </Button>
                            </div>
                            
                            {resolvedAddress && (
                                <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Wallet className="h-3 w-3 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-medium text-muted-foreground">Resolved address</div>
                                            <div className="font-mono text-sm">{truncateAddress(resolvedAddress)}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {error && (
                                <div className="mt-2 p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                                    <span className="text-sm text-destructive">{error}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Amount Section */}
                <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-medium">
                        Amount
                    </Label>
                    <div className="relative">
                        <Input
                            id="amount"
                            type="number"
                            placeholder="0.0"
                            value={amount}
                            onChange={(e) => setAmountValue(e.target.value)}
                            className="pr-16"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-muted rounded text-sm font-medium">
                            ETH
                        </div>
                    </div>
                </div>
            </div>

            <DialogFooter className="gap-3">
                <Button
                    variant="outline"
                    onClick={() => {
                        setOpen(false);
                        setDestinationAddress("");
                        setAmount("");
                    }}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSendTransaction}
                    disabled={(addressType === 'ocid' && !resolvedAddress) || isLoading}
                    className="flex-1 bg-primary hover:bg-primary/90"
                >
                    <Send className="w-4 h-4 mr-2" />
                    Send
                </Button>
            </DialogFooter>
        </div>
    );
};