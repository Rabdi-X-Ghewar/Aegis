import { Navigate, Route, Routes, useNavigate } from 'react-router'
import './App.css'
import "@stakekit/widget/style.css";


import { usePrivy, useWallets } from '@privy-io/react-auth';
import HomeBeforeLogin from './pages/HomeBeforeLogin';
import HomeAfterLogin from './pages/HomeAfterLogin';
import { addUserToDatabase } from './apiClient';
import { useEffect } from 'react';
import WalletTracker from './pages/WalletTracker';
import Profile from './pages/Profile';
import SavedWalletsPage from './pages/SavedWalletsPage';
import TransactionPage from './pages/Transactions';
import AgentDetails from './pages/AgentDetails';
import StakeTokens from './pages/StakeTokens';
import { LoginCallBack } from '@opencampus/ocid-connect-js';
import { toast } from 'sonner';

function App() {
  const navigate = useNavigate();

  const { authenticated, user } = usePrivy();
  useEffect(() => {
    if (authenticated) {
      addUserToDatabase(user);
    }

  }, [user]);
  // console.log(JSON.stringify(user));
  const { wallets } = useWallets();
  console.log(JSON.stringify(wallets));

  const loginSuccess = () => {
    toast.success('Open Campus Connect Successful');
    navigate('/profile');
  }
  const loginError = () => {
    toast.error('Open Campus Connect Failed');
    navigate('/profile');
  }
  return (
    <>
      {authenticated ? <HomeAfterLogin /> : <HomeBeforeLogin />}
      <div className="ml-64 px-3">
        <Routes>
          {authenticated && (
            <>
              <Route path="/" element={<Navigate to="/profile" replace />} />
              <Route path="/redirect" element={<LoginCallBack errorCallback={loginError} successCallback={loginSuccess} customErrorComponent={undefined} customLoadingComponent={undefined} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/watcher" element={<WalletTracker />} />
              <Route path="/saved-wallets" element={<SavedWalletsPage />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="/chat-bot" element={<AgentDetails />} />
              <Route path='/stake' element={<StakeTokens />} />
            </>
          )}
        </Routes>
      </div>
    </>


  )
}

export default App
