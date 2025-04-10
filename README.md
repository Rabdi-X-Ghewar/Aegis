# Aegis

> Streamlining Multi-Chain Interactions with OCID-Based Payments on OpenCampus EduChain

![WhatsApp Image 2025-04-10 at 20 48 09](https://github.com/user-attachments/assets/763d9542-406e-4e67-9067-11ecbb40ce1a)


## Introduction

Aegis represents a groundbreaking implementation of OCID-based payments on OpenCampus EduChain, marking a significant milestone as the first of its kind in OpenCampus history. This innovative platform seamlessly integrates wallet connectivity, OCID-based transactions, multi-chain agent configuration, document interaction, and real-time data streaming capabilities.

## Key Features

- **OCID-Based Wallet Integration**
    - Seamless wallet connection through [OpenCampus ID (OCID)](https://github.com/Rabdi-X-Ghewar/Aegis/blob/main/client/src/components/navigation/MainNav.tsx#L168)
    - [Linking](https://github.com/Rabdi-X-Ghewar/Aegis/blob/main/client/src/components/navigation/MainNav.tsx#L98) any wallet to your OCID
    - Secure authentication and transaction signing on [Edu Chain](https://github.com/Rabdi-X-Ghewar/Aegis/blob/main/client/src/main.tsx#L68) with privy wallets
    - Unified wallet management interface
    - Real-time OCID wallet balance tracking
    - Direct transaction capabilities from OCID wallet
    - Integrated address management and copying functionality
    - Seamless interaction with EDU token transactions

- **Multi-Chain Support**
  - Cross-chain transaction capabilities
  - Unified dashboard for multiple blockchain interactions
  - Real-time balance tracking across chains

- **Document Interaction System**
  - Smart contract-based document verification
  - Secure document sharing and storage
  - Educational credential management

- **Real-Time Data Streaming**
  - EduChain-powered data streaming
  - Live transaction monitoring
  - Real-time analytics and reporting

## Technology Stack

- **Frontend**
  - React.js
  - TypeScript
  - Tailwind CSS
  - Privy SDK

- **Backend**
  - Node.js
  - ElizaOS Integration :- plugin-evm
  ```
  "settings": {
        "secrets": {},
        "voice": {
            "model": "en_US-hfc_male-medium"
        },
        "chains": {
            "evm": ["eduChainTestnet"]
           
        }
    },
  ```
  - OpenCampus SDK

- **Blockchain**
  - OpenCampus EduChain
  - MetaMask SDK
  - Solidity Smart Contracts

## Getting Started

### Prerequisites

```bash
node >= 16.0.0
npm >= 8.0.0
```

2. Install dependencies:
```bash
npm install
 ```

3. Configure environment variables:
```bash
cp .env.example .env
 ```

4. Start the development server:
```bash
npm run dev
 ```

## How It Works

### Wallet Connection Flow
1. Users authenticate using their OpenCampus ID (OCID)
2. OCID connects to their preferred wallet
3. Wallet is authorized for transactions on EduChain

### Transaction Process
1. User initiates transaction through Aegis interface
2. OCID validates the transaction request
3. Transaction is processed on EduChain
4. Real-time confirmation and status updates

### Multi-Chain Agent Configuration
1. Agents are configured for specific blockchain networks
2. Smart contracts handle cross-chain communication
3. Automated verification and execution of transactions


## Use Cases

### Educational Institutions
- Transact using OCID wallet
- Student payment management
- Course enrollment transactions

### Cross-Chain Payments
- Seamless token transfers between chains
- Unified payment gateway for educational services
- Automated fee processing

### Data Management
- Secure storage of agent interactions
- Real-time access to token rates
- Automated compliance checking

## Contributing
We welcome contributions to Aegis! Please read our contributing guidelines before submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For support and queries, contact: daiwikmahesh@gmail.com
