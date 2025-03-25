import { Globe } from "lucide-react";
import { NetworkKey, SUPPORTED_NETWORKS } from "../lib/fetchWalletBalance";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const NetworkSelector = ({ 
    selectedNetwork, 
    setSelectedNetwork 
}: { 
    selectedNetwork: NetworkKey;
    setSelectedNetwork: (network: NetworkKey) => void;
}) => {
    return (
        <div className="mb-4 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <Select
                value={selectedNetwork}
                onValueChange={(value: NetworkKey) => setSelectedNetwork(value)}
            >
                <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select Network" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(SUPPORTED_NETWORKS).map(([key, network]) => (
                        <SelectItem key={key} value={key}>
                            {network.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};