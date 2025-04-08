import { Toaster } from "../components/ui/toaster";
import { TooltipProvider } from "../components/ui/tooltip";
import { SidebarProvider } from "../components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import {  Cog, ArrowLeft } from "lucide-react";
import type { UUID } from "@elizaos/core";
import Chat from "../components/chat";
import Overview from "../components/overview";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/page-title";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAgentName } from "@/lib/utils";
import { useState } from "react";
import { AgentSidebar } from "@/components/agent-sidebar";

const AgentHub = () => {
    const [selectedAgentId, setSelectedAgentId] = useState<UUID | null>(null);
    const [view, setView] = useState<'chat' | 'overview' | 'home'>('home');

    const agentsQuery = useQuery({
        queryKey: ["agents"],
        queryFn: () => apiClient.getAgents(),
        refetchInterval: 5_000,
    });

    const query = useQuery({
        queryKey: ["agent", selectedAgentId],
        queryFn: () => apiClient.getAgent(selectedAgentId ?? ""),
        refetchInterval: 5_000,
        enabled: Boolean(selectedAgentId),
    });

    const character = query?.data?.character;
    const agents = agentsQuery?.data?.agents;

    const renderMainContent = () => {
        switch (view) {
            case 'chat':
                return selectedAgentId ? (
                    <div className="h-full flex flex-col">
                        <div className="p-4 flex items-center gap-3">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-xl"
                                onClick={() => setView('home')}
                            >
                                <ArrowLeft />
                            </Button>
                            <h1 className="text-xl font-bold">Chat with {query?.data?.character?.name}</h1>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <Chat agentId={selectedAgentId} />
                        </div>
                    </div>
                ) : null;
            case 'overview':
                return selectedAgentId ? (
                    <div className="h-full flex flex-col">
                        <div className="p-4 flex items-center gap-3">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-xl"
                                onClick={() => setView('home')}
                            >
                                <ArrowLeft />
                            </Button>
                            <h1 className="text-xl font-bold">{query?.data?.character?.name} Overview</h1>
                        </div>
                        <div className="flex-1 overflow-hidden px-4 pb-4">
                            <div className="bg-white rounded-2xl shadow-sm h-full overflow-auto">
                                {character && <Overview character={character} />}
                            </div>
                        </div>
                    </div>
                ) : null;
            default:
                return (
                    <div className="flex flex-col gap-4 h-full p-4">
                        <PageTitle title="Agents" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {agents?.map((agent: { id: UUID; name: string }) => (
                                <Card key={agent.id} className="rounded-2xl border-none shadow-sm overflow-hidden">
                                    <CardHeader className="bg-white">
                                        <CardTitle>{agent?.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="bg-white pt-2">
                                        <div className="rounded-xl bg-muted aspect-square w-full grid place-items-center">
                                            <div className="text-6xl font-bold uppercase">
                                                {formatAgentName(agent?.name)}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-white pt-0">
                                        <div className="flex items-center gap-4 w-full">
                                            <Button
                                                variant="outline"
                                                className="w-full grow rounded-xl"
                                                onClick={() => {
                                                    setSelectedAgentId(agent.id);
                                                    setView('chat');
                                                }}
                                            >
                                                Chat
                                            </Button>
                                            <Button 
                                                size="icon" 
                                                variant="outline"
                                                className="rounded-xl"
                                                onClick={() => {
                                                    setSelectedAgentId(agent.id);
                                                    setView('overview');
                                                }}
                                            >
                                                <Cog />
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <TooltipProvider delayDuration={0}>
            <SidebarProvider>
                <div className="flex relative h-screen w-full overflow-hidden bg-gray-50">
                    <div className="flex-1 overflow-hidden rounded-2xl m-4 bg-white shadow-sm">
                        <div className="h-full">
                            {renderMainContent()}
                        </div>
                    </div>
                    
                    <div className="rounded-2xl m-4 mr-2 overflow-hidden shadow-sm">
                        <AgentSidebar 
                            agents={agents ?? []}
                            selectedAgentId={selectedAgentId}
                            character={character}
                            onAgentSelect={(id) => {
                                setSelectedAgentId(id);
                                setView('chat');
                            }}
                        />
                    </div>
                </div>
            </SidebarProvider>
            <Toaster />
        </TooltipProvider>
    );
};

export default AgentHub;