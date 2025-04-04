import express, { Request, Response } from 'express';
import { ethers } from 'ethers';
import { WalletLink } from '../models/WalletLink';

// Define request body interface
interface LinkWalletRequest {
    ocid: string;
    walletAddress: string;
    signature: string;
    message: string;
    timestamp: string;
}

const router = express.Router();

// Link a wallet to an OCID
router.post('/ocid/link-wallet', async (req: Request<{}, {}, LinkWalletRequest>, res: Response): Promise<void> => {
    try {
        const { ocid, walletAddress, signature, message, timestamp } = req.body;

        // Validate inputs
        if (!ocid || !walletAddress || !signature || !message || !timestamp) {
            res.status(400).json({ success: false, error: 'Missing required fields' });
            return;
        }

        // Verify that the message is properly formatted
        const expectedMessagePrefix = `I am linking wallet address ${walletAddress} to OpenCampus ID ${ocid} at timestamp`;
        if (!message.startsWith(expectedMessagePrefix)) {
            res.status(400).json({ success: false, error: 'Invalid message format' });
            return;
        }

        // Check if timestamp is recent (within 5 minutes)
        const messageTimestamp = parseInt(timestamp);
        const currentTime = Date.now();
        if (currentTime - messageTimestamp > 5 * 60 * 1000) { // 5 minutes in milliseconds
            res.status(400).json({ success: false, error: 'Signature expired' });
            return;
        }

        // Verify signature - ensure wallet owner signed the message
        try {
            const recoveredAddress = ethers.verifyMessage(message, signature);
            if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
                res.status(400).json({ success: false, error: 'Invalid signature' });
                return;
            }
        } catch (error) {
            res.status(400).json({ success: false, error: 'Signature verification failed' });
            return;
        }

        // Check if wallet is already linked to another OCID
        const existingWalletLink = await WalletLink.findOne({ walletAddress });
        if (existingWalletLink && existingWalletLink.ocid !== ocid) {
            res.status(400).json({
                success: false,
                error: 'Wallet is already linked to another OCID'
            });
            return;
        }

        // Update or create wallet link
        const result = await WalletLink.findOneAndUpdate(
            { ocid },
            {
                walletAddress,
                signature,
                message,
                timestamp: messageTimestamp
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );

        res.status(200).json({
            success: true,
            message: 'Wallet successfully linked to OCID',
            result
        });
    } catch (error) {
        console.error('Error linking wallet to OCID:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Get wallet info for an OCID
router.get('/ocid/:ocid/wallet', async (req: Request, res: Response): Promise<void> => {
    try {
        const { ocid } = req.params;
        
        if (!ocid) {
            res.status(400).json({ success: false, error: 'OCID is required' });
            return;
        }

        const walletLink = await WalletLink.findOne({ ocid });
        
        if (!walletLink) {
            res.status(404).json({ success: false, error: 'No wallet linked to this OCID' });
            return;
        }

        res.status(200).json({
            success: true,
            walletAddress: walletLink.walletAddress,
            linkedAt: new Date(parseInt(walletLink.timestamp.toString()))
        });
    } catch (error) {
        console.error('Error fetching wallet information:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Unlink a wallet from an OCID
router.delete('/ocid/:ocid/wallet', async (req: Request, res: Response): Promise<void> => {
    try {
        const { ocid } = req.params;

        if (!ocid) {
            res.status(400).json({ success: false, error: 'OCID is required' });
            return;
        }

        const result = await WalletLink.findOneAndDelete({ ocid });

        if (!result) {
            res.status(404).json({ success: false, error: 'No wallet linked to this OCID' });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Wallet successfully unlinked from OCID'
        });
    } catch (error) {
        console.error('Error unlinking wallet:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Verify if a wallet is linked to a specific OCID
router.get('/verify-wallet/:walletAddress/:ocid', async (req: Request, res: Response): Promise<void> => {
    try {
        const { walletAddress, ocid } = req.params;

        if (!walletAddress || !ocid) {
            res.status(400).json({ success: false, error: 'Wallet address and OCID are required' });
            return;
        }

        const walletLink = await WalletLink.findOne({
            ocid,
            walletAddress: walletAddress.toLowerCase()
        });

        res.status(200).json({
            success: true,
            isLinked: !!walletLink
        });
    } catch (error) {
        console.error('Error verifying wallet link:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

export default router;