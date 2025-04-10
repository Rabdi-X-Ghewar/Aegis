import { Home, LayoutGrid, Ticket, Wine, Users, Fish, Trophy } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
    SidebarSeparator,
    SidebarGroup,
    SidebarGroupLabel
} from "../ui/sidebar"
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from "@/assets/aegislogo.png"

const sidebarItems = [
    { icon: LayoutGrid, label: "Dashboard", href: "/profile" },
    { icon: Ticket, label: "Wallet Watcher", href: "/watcher" },
    { icon: Wine, label: "Transactions", href: "/transactions" },
    { icon: Users, label: "Chat Bot", href: "/chat-bot" },
    { icon: Fish, label: "Saved Wallets", href: "/saved-wallets" },
    { icon: Trophy, label: "Stake", href: "/stake" },
]

export function AppSidebar() {
    const { logout, user, linkWallet } = usePrivy();
    const { wallets } = useWallets();
    
    return (
        <Sidebar 
            collapsible="icon" 
            className="border-border bg-background fixed h-screen w-64 z-50 shadow-md"
        >
            <SidebarHeader className="border-b border-border px-3 py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <Link to="/" className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg shadow-sm">
                                    <img src={logo} alt="Aegislogo" />
                                </div>
                                <span className="font-semibold text-xl text-foreground">Aegis</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            
            <SidebarContent className="py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-muted-foreground font-medium">
                        Main Navigation
                    </SidebarGroupLabel>
                    
                    <SidebarMenu>
                        {sidebarItems.map((item) => (
                            <SidebarMenuItem key={item.label}>
                                <SidebarMenuButton 
                                    asChild 
                                    tooltip={item.label}
                                    className="rounded-lg transition-colors duration-200"
                                >
                                    <Link to={item.href} className="text-muted-foreground hover:text-foreground flex items-center w-full">
                                        <div className="flex items-center w-5 h-5">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                
                <SidebarSeparator className="my-4" />
                
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-muted-foreground font-medium">
                        Settings
                    </SidebarGroupLabel>
                    
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton 
                                asChild 
                                tooltip="Settings"
                                className="rounded-lg transition-colors duration-200"
                            >
                                <Link to="/settings" className="text-muted-foreground hover:text-foreground flex items-center w-full">
                                    <div className="flex items-center justify-center w-5 h-5">
                                        <Home className="h-5 w-5" />
                                    </div>
                                    <span>Settings</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="border-t border-border mt-auto">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton 
                                    asChild 
                                    tooltip="Profile"
                                    className="rounded-lg transition-colors duration-200"
                                >
                                    <button className="flex items-center gap-4 text-muted-foreground hover:text-foreground w-full">
                                        <div className="flex items-center w-5 h-5">
                                            <Avatar className="h-5 w-5 border border-border">
                                                <AvatarImage src="/avatar-placeholder.png"/>
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {user?.email?.address?.charAt(0)?.toUpperCase() || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs font-medium">{user?.email?.address || "User"}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {wallets.length > 0 ? `${wallets.length} wallet(s)` : "No wallets"}
                                            </span>
                                        </div>
                                    </button>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 p-2 rounded-lg border border-border shadow-lg">
                                <DropdownMenuItem className="rounded-md py-2">
                                    <span className="font-semibold">{user?.email?.address}</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem className="rounded-md py-2">
                                    <div className="flex flex-col space-y-2 w-full">
                                        <span className="font-semibold text-sm">Connected Wallets:</span>
                                        {wallets.length > 0 ? (
                                            <div className="max-h-32 overflow-y-auto space-y-1">
                                                {wallets.map((wallet, index) => (
                                                    <div key={index} className="text-xs text-muted-foreground bg-muted/30 p-2 rounded-md">
                                                        <div className="font-medium">{wallet.walletClientType}</div>
                                                        <div className="truncate">{wallet.address}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">No wallets connected</span>
                                        )}
                                    </div>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem onClick={linkWallet} className="rounded-md mt-2">
                                    <Button variant="outline" className="w-full rounded-md">Link Another Wallet</Button>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem onClick={logout} className="rounded-md mt-1">
                                    <Button variant="destructive" className="w-full rounded-md">Sign Out</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            
            <SidebarRail />
        </Sidebar>
    )
}