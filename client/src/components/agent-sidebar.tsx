import { User, X } from "lucide-react";
import type { UUID } from "@elizaos/core";
import { Avatar, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import type { Character } from "@elizaos/core";

interface AgentSidebarProps {
    agents: Array<{ id: UUID; name: string }>;
    selectedAgentId: UUID | null;
    character?: Character;
    onAgentSelect: (id: UUID) => void;
}

export function AgentSidebar({ agents, selectedAgentId, character, onAgentSelect }: AgentSidebarProps) {
    return (
        <div className="w-64 h-full bg-background p-4 flex flex-col gap-4">
            {/* Available Agents Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="font-semibold">Available Agents</h2>
                    <span className="text-sm text-muted-foreground">{agents.length} agents</span>
                </div>
                
                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-2">
                            {agents?.map((agent) => (
                                <div
                                    key={agent.id}
                                    className={`flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors ${
                                        selectedAgentId === agent.id ? "bg-secondary/20" : ""
                                    }`}
                                    onClick={() => onAgentSelect(agent.id)}
                                >
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={`${agent.name}.jpeg`} />
                                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10">
                                            <User className="h-5 w-5 text-primary" />
                                        </div>
                                    </Avatar>
                                    <span className="font-medium">{agent.name}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>

            {/* Agent Info Section */}
            {character && (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="font-semibold">Agent Info</h2>
                        <button className="text-muted-foreground rounded-full hover:bg-muted p-1">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-hidden">
                        <ScrollArea className="h-full">
                            <div className="p-4 pb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={`${character.name}.jpeg`} />
                                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10">
                                            <User className="h-6 w-6 text-primary" />
                                        </div>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium">{character.name}</h3>
                                        <p className="text-sm text-muted-foreground">Active Agent</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-secondary/10 rounded-xl p-3">
                                        <p className="text-sm text-muted-foreground mb-1">Model</p>
                                        <p className="font-medium">{character.modelProvider}</p>
                                    </div>
                                    
                                    <div className="bg-secondary/10 rounded-xl p-3">
                                        <p className="text-sm text-muted-foreground mb-1">Bio</p>
                                        <p className="font-medium">
                                            {Array.isArray(character.bio) ? character.bio[0] : character.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            )}
        </div>
    );
}