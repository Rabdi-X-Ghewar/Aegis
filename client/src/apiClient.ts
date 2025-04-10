import { LinkWalletParams } from "./lib/types";

const API_URL = 'https://aegis-qlbu.onrender.com';

export const addUserToDatabase = async (user: any) => {
    try {
        const response = await fetch(`${API_URL}/api/add-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

export const fetchWallet = async (email: string) => {
    try {
        const response = await fetch(`${API_URL}/api/fetch-wallet/${email}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error adding user:', error);
    }
}


export const sendServerTransaction = async (email: string, to: string, valueInEth: string) => {
    try {
        const response = await fetch(`${API_URL}/api/send-transaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, to, valueInEth }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error sending transaction:', error);
    }
}


export const getSavedWallets = async (email: string) => {
    try {
        const response = await fetch(`${API_URL}/api/saved-wallets/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("Error fetching saved wallets:", error);
    }
}


export const saveWallet = async (email: string, address: string, nickname: string) => {
    try {
        const response = await fetch(`${API_URL}/api/saved-wallets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, address, nickname }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("Error saving wallet:", error);
    }
}

export const deleteWallet = async (email: string, address: string) => {
    try {
        const response = await fetch(`${API_URL}/api/saved-wallets`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, address }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("Error deleting wallet:", error);
    }
}


export async function linkWalletToOCID(params: LinkWalletParams) {
    try {
        const response = await fetch(`${API_URL}/api/ocid/link-wallet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error linking wallet:', error);
        return { success: false, error: 'Failed to link wallet. Please try again.' };
    }
}


export async function getWalletForOCID(ocid: string) {
    try {
        const response = await fetch(`${API_URL}/api/ocid/${ocid}/wallet`);

        if (response.status === 404) {
            return { success: false, error: 'No wallet linked to this OCID' };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching wallet information:', error);
        return { success: false, error: 'Failed to retrieve wallet information' };
    }
}

export async function unlinkWalletFromOCID(ocid: string) {
    try {
        const response = await fetch(`${API_URL}/api/ocid/${ocid}/wallet`, {
            method: 'DELETE',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error unlinking wallet:', error);
        return { success: false, error: 'Failed to unlink wallet' };
    }
}

export async function verifyWalletLink(walletAddress: string, ocid: string) {
    try {
        const response = await fetch(`${API_URL}/api/verify-wallet/${walletAddress}/${ocid}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error verifying wallet link:', error);
        return { success: false, isLinked: false, error: 'Failed to verify wallet link' };
    }
}
