import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ChatBotAccessABI from "../../hooks/ChatBotAccess.json"; // Adjust path
import { useWallets } from "@privy-io/react-auth";

const CONTRACT_ADDRESS = "0xe582A14Ca3A6A6068Ff5CA9D93CBB88F6D1277A3";
const EDU_TOKEN_ADDRESS = "0x65CcBF3dA98bB8a388D1EE04b484e91A90dF9dF2";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize provider and signer
  const getProviderAndSigner = async () => {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask!");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return { provider, signer };
  };

  // Check if user has access
  const checkAccess = async () => {
    try {
      const { provider } = await getProviderAndSigner();
      const { wallets } = useWallets();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ChatBotAccessABI, provider);
      const userAddress = wallets[0].getEthereumProvider();
      
      const access = await contract.hasAccess(userAddress);
      setHasAccess(access);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle payment (approve EDU, then payForAccess)
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { signer } = await getProviderAndSigner();

      // Step 1: Approve EDU token spending
      const eduTokenABI = ["function approve(address spender, uint256 amount) returns (bool)"];
      const eduContract = new ethers.Contract(EDU_TOKEN_ADDRESS, eduTokenABI, signer);
      const ACCESS_COST = ethers.parseUnits("0.01", 18); // 0.01 EDU
      const approveTx = await eduContract.approve(CONTRACT_ADDRESS, ACCESS_COST);
      await approveTx.wait();

      // Step 2: Call payForAccess
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ChatBotAccessABI, signer);
      const payTx = await contract.payForAccess();
      await payTx.wait();

      setHasAccess(true);
    } catch (err) {
        console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Check access on mount
  useEffect(() => {
    checkAccess();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!hasAccess) {
    return (
      <div>
        <h2>Access Required</h2>
        <p>You need to pay 0.01 EDU to access the chatbot.</p>
        <button onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    );
  }

  return children; // Render AgentHub if access is granted
};

export default ProtectedRoute;