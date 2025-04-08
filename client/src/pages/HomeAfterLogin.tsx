
import { MainNav } from "../components//navigation/MainNav"
import { AppSidebar } from "../components/navigation/AppSidebar"
import { Routes, Route, Navigate} from "react-router"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"

import Profile from './Profile';
import SavedWalletsPage from './SavedWalletsPage';
import TransactionPage from './Transactions';
// import AgentDetails from './pages/AgentHub';
import StakeTokens from './StakeTokens';
import WalletTracker from "./WalletTracker";
import AgentHub from "./AgentHub";
// import Chat from "../routes/chat";
// import Overview from "../routes/overview";


const HomeAfterLogin = () => {

    return (
        <SidebarProvider>
            <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
                <AppSidebar />
                <div className="flex flex-col min-h-screen w-full">
                    <header className="border-b">
                        <div className="flex h-16 items-center px-4 gap-4">
                            <SidebarTrigger />
                            <div className="flex items-center gap-2 mr-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                    <span className="text-lg font-bold text-primary-foreground">A</span>
                                </div>
                                <span className="font-semibold text-xl">Aurora</span>
                            </div>
                            <MainNav />
                        </div>
                    </header>
                    <main className="flex-1 min-h-screen">
                        <Routes>
                            <Route path="/" element={<Navigate to="/profile" replace />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/watcher" element={<WalletTracker />} />
                            <Route path="/saved-wallets" element={<SavedWalletsPage />} />
                            <Route path="/transactions" element={<TransactionPage />} />
                            <Route path="/chat-bot" element={<AgentHub />} />
                            <Route path='/stake' element={<StakeTokens />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default HomeAfterLogin