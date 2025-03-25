import { CreditCard, Wallet2 } from "lucide-react";

export const getWalletIcon = (clientType: string) => {
    switch (clientType.toLowerCase()) {
        case 'metamask':
            return <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZaVpfhv3kgZA46GoqfVNIFhR6pXIdX4_Rg&s"
                alt="MetaMask"
                className="w-8 h-8" />;
        case 'coinbase_wallet':
            return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 512 512" id="coinbase" className="w-8 h-8">
                <g clipPath="url(#clip0_84_15704)">
                    <rect width="512" height="512" fill="#0052FF" rx="60"></rect>
                    <path fill="#0052FF" d="M255.5 40C375.068 40 472 136.932 472 256.5C472 376.068 375.068 473 255.5 473C135.932 473 39 376.068 39 256.5C39 136.932 135.932 40 255.5 40Z"></path>
                    <path fill="#fff" d="M255.593 331.733C213.515 331.733 179.513 297.638 179.513 255.653C179.513 213.668 213.608 179.573 255.593 179.573C293.258 179.573 324.535 206.999 330.547 242.973H407.19C400.71 164.826 335.337 103.398 255.5 103.398C171.436 103.398 103.245 171.589 103.245 255.653C103.245 339.717 171.436 407.907 255.5 407.907C335.337 407.907 400.71 346.48 407.19 268.333H330.453C324.441 304.307 293.258 331.733 255.593 331.733Z"></path>
                </g>
                <defs>
                    <clipPath id="clip0_84_15704">
                        <rect width="512" height="512" fill="#fff"></rect>
                    </clipPath>
                </defs>
            </svg>;
        case 'privy':
            return <Wallet2 className="w-8 h-8 text-primary" />;
        case 'opencampus':
            return <img src="https://opencampus.xyz/static/media/coin-logo.39cbd6c42530e57817a5b98ac7621ca7.svg" alt="Open Campus" className="w-8 h-8" />;
        default:
            return <CreditCard className="w-8 h-8 text-muted-foreground" />;
    }
};