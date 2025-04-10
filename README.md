# Aegis 🚀  
**Streamlining Multi-Chain Interactions with OCID-Based Payments on OpenCampus EduChain**

![Banner](https://github.com/user-attachments/assets/763d9542-406e-4e67-9067-11ecbb40ce1a)

<p align="center">
  <img src="https://img.shields.io/badge/OpenCampus-EduChain-blue" />
  <img src="https://img.shields.io/badge/OCID-Integrated-green" />
  <img src="https://img.shields.io/github/license/Rabdi-X-Ghewar/Aegis" />
</p>

---

## 🧭 Introduction

**Aegis** is a pioneering platform implementing **OCID-based payments** on the **OpenCampus EduChain**, serving as the **first solution of its kind** in OpenCampus history. It offers seamless integration of wallet connectivity, multi-chain payments, document verification, and real-time data streaming — all wrapped into an intuitive and developer-friendly environment.

---

## ✨ Key Features

### 🔐 OCID-Based Wallet Integration
- Instant wallet connection via [OpenCampus ID (OCID)](https://github.com/Rabdi-X-Ghewar/Aegis/blob/main/client/src/components/navigation/MainNav.tsx#L168)
- [Bind](https://github.com/Rabdi-X-Ghewar/Aegis/blob/main/client/src/components/navigation/MainNav.tsx#L98) any wallet to your OCID
- Secure authentication + transaction signing via [EduChain](https://github.com/Rabdi-X-Ghewar/Aegis/blob/main/client/src/main.tsx#L68)
- One-stop wallet dashboard for multi-chain interactions

### 🌐 Multi-Chain Support
- Cross-chain payment processing
- Real-time balance and asset tracking
- Agent-based architecture for handling multiple chains

### 📄 Document Interaction System
- Smart contract-based document verification
- Decentralized document storage & sharing
- Credential issuance for educational institutions

### 📊 Real-Time Data Streaming
- Stream transaction status and analytics over EduChain
- Monitor live transaction flows
- Get real-time updates via integrated dashboards

---

## 🛠️ Technology Stack

### Frontend
- **React.js** + **TypeScript**
- **Tailwind CSS** for responsive UI
- **Privy SDK** for wallet integration and OCID support

### Backend
- **Node.js**
- **OpenCampus SDK**
- **ElizaOS Integration** with `plugin-evm`

```json
"settings": {
  "secrets": {},
  "voice": { "model": "en_US-hfc_male-medium" },
  "chains": { "evm": ["eduChainTestnet"] }
}
```

### Blockchain Layer
- **OpenCampus EduChain**
- **MetaMask SDK**
- **Solidity Smart Contracts**

---


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

### 🔗 Wallet Connection Flow
1. User authenticates with their OpenCampus ID (OCID)
2. Connects to their preferred wallet
3. OCID manages authentication & permissions for transactions
4. Wallet gets authorized to interact with EduChain

### 💸 Transaction Lifecycle
1. Transaction initiated via Aegis UI
2. OCID signs and verifies the request
3. Transaction executed on EduChain
4. Confirmation + status streamed live

<<<<<<< HEAD
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
=======
### 🕸️ Multi-Chain Agent Configuration
1. Blockchain agents configured for each supported network
2. Smart contracts manage inter-chain calls and state
3. Transactions are validated and executed securely across chains
---

## ⚙️ Getting Started

### 🔧 Prerequisites

```bash
node >= 16.0.0
npm >= 8.0.0
```

### 📦 Installation

1. Clone the repo:

```bash
git clone https://github.com/Rabdi-X-Ghewar/Aegis.git
cd Aegis
```

2. Install dependencies:

```bash
npm install
```

3. Create your environment file:

```bash
cp .env.example .env
```

4. Run the development server:

```bash
npm run dev
```

## 👨‍💻 Contributing

We welcome contributions from the community! Here’s how you can help:
- 🛠️ Fix bugs
- 🧠 Suggest features
- 🧪 Add tests
- 🧹 Improve documentation

> Please read our [contributing guidelines](CONTRIBUTING.md) before submitting a PR.

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 Support

For queries, bug reports, or integration help, reach out:

📩 **Email**: daiwikmahesh@gmail.com  
📂 **Repo**: [github.com/Rabdi-X-Ghewar/Aegis](https://github.com/Rabdi-X-Ghewar/Aegis)

