import { useCreateWallet, useLogin, usePrivy } from "@privy-io/react-auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { addUserToDatabase } from "../apiClient";
import { HoverButton } from "./ui/hover-button";

export default function Login() {
    const { createWallet } = useCreateWallet();
    const navigate = useNavigate();

    const { authenticated, user, linkWallet } = usePrivy();
    const { login } = useLogin({
        onComplete: async () => {
            await addUserToDatabase(user);
            if (!user?.wallet?.address) {
                setIsModalOpen(true);
            }
        },
        onError: (error) => {
            console.error("Login error:", error);
        },
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateSEmbeddedWallet = async () => {
        try {
            createWallet();
            navigate("/profile");
        } catch (error) {
            console.error("Error creating server wallet:", error);
        }
    };

    return (
        <>
            {!authenticated &&
                (
                    <HoverButton className=" text-[#c0ff00] px-6 py-2 rounded-full transition-colors"
                        onClick={login}>
                        Log In
                    </HoverButton>
                )}

            {/* Modal for post-login actions */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Choose an Option</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Button
                            onClick={() => {
                                linkWallet();
                                setIsModalOpen(false);
                                navigate("/profile");
                            }}
                            className="w-full"
                        >
                            Link External Wallet
                        </Button>
                        <Button
                            onClick={handleCreateSEmbeddedWallet}
                            className="w-full"
                        >
                            Create Server Wallet
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}