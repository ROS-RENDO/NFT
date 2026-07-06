# TechTuneNFT: Decentralized Marketplace Presentation

Here is a complete slide-by-slide script for your Assignment V presentation. It is structured to be professional, technical, and easy to follow.

---

## Slide 1: Title Slide
**Slide Content:**
- **Title:** TechTuneNFT: A Decentralized NFT Marketplace
- **Subtitle:** Assignment V - DApp Development
- **Student Name:** [Your Name]
- **Course:** Programming Year III

**🗣️ What you say (Speaker Script):**
> "Hello everyone. Today I am excited to present my Assignment V project: **TechTuneNFT**. It is a fully functional, decentralized NFT marketplace built from scratch that allows users to seamlessly mint, buy, and list digital assets on the blockchain directly from their web browser."

---

## Slide 2: Project Objectives & Requirements
**Slide Content:**
- **Objective:** Build a web-based DApp integrating a frontend and a smart contract.
- **Key Requirements Met:**
  - Responsive Web Frontend (React + Vite)
  - Blockchain Connectivity (MetaMask + Ethers.js)
  - Smart Contract Integration (Assignment IV)
  - Core Functions: `mintNFT()`, `buyNFT()`, `listNFT()`

**🗣️ What you say (Speaker Script):**
> "The objective of this assignment was to build a complete DApp architecture. To achieve this, I built a modern frontend using React and Vite, and successfully connected it to the Ethereum smart contract we developed in Assignment IV. The application securely handles Web3 wallet connectivity via MetaMask and allows users to store and retrieve blockchain data through a clean, user-friendly interface."

---

## Slide 3: The Tech Stack
**Slide Content:**
- **Blockchain Layer:** Solidity, Hardhat, Local EVM Node
- **Frontend Layer:** React.js, Vite, Ethers.js v6
- **Design & UI:** Vanilla CSS, Premium Glassmorphism UI, Outfit Typography
- **Wallet Provider:** MetaMask

**🗣️ What you say (Speaker Script):**
> "For the technology stack, I used Hardhat to compile and deploy the Solidity smart contract to a local EVM network. The frontend is powered by React.js for fast component rendering and Ethers.js to communicate with the blockchain. Instead of relying on heavy CSS frameworks, I wrote custom Vanilla CSS using modern 'glassmorphism' design principles to give the app a premium, high-end feel."

---

## Slide 4: Smart Contract Architecture
**Slide Content:**
- **Standard:** ERC-721 (Non-Fungible Tokens)
- **Key Data Structures:** `Listing` struct (TokenID, Price, Seller, Owner, URI)
- **Contract Logic:** Acts as a secure escrow during the listing phase.
- **Security:** Requires exact ETH values for purchases and strict ownership checks.

**🗣️ What you say (Speaker Script):**
> "At the core of the application is our ERC-721 smart contract. The contract is designed to act as a secure escrow. When a user lists an NFT, the contract temporarily holds the asset to guarantee that it is available for buyers. It uses strict validation to ensure that buyers send the exact asking price, automatically transferring funds to the seller and the NFT to the buyer in a single, trustless transaction."

---

## Slide 5: Live Demonstration Workflow
**Slide Content:**
- **Step 1:** Wallet Connection (MetaMask Integration)
- **Step 2:** Minting & Listing (`mintNFT`)
- **Step 3:** Browsing the Marketplace (Fetching active listings)
- **Step 4:** Purchasing (`buyNFT` and ownership transfer)

**🗣️ What you say (Speaker Script):**
> "Now I will walk you through the application workflow. First, the user connects their MetaMask wallet. As you can see, the DApp instantly displays our live ETH balance. Next, they can navigate to the Mint tab, upload an image URL, set a price, and mint their NFT directly to the blockchain. Once minted, the NFT appears on the global Marketplace tab. Finally, switching to a different account, a buyer can seamlessly purchase the NFT, updating the blockchain state and seller's balance in real-time."

*(At this point, you should switch your screen to the browser and do a quick live demo of connecting the wallet, minting an NFT, and buying it with the second account).*

---

## Slide 6: Challenges & Learnings
**Slide Content:**
- **Challenges:**
  - EVM version compatibility (Handling the `mcopy` opcode via Cancun update).
  - Managing asynchronous state between React and the Blockchain.
  - Designing a responsive, non-blocking UI for blockchain transactions.
- **Learnings:** Deepened understanding of Web3 architecture, Ethers.js integration, and decentralized state management.

**🗣️ What you say (Speaker Script):**
> "Building this wasn't without challenges. I had to resolve compiler versioning issues by configuring Hardhat for the 'Cancun' EVM upgrade to support newer opcodes. I also learned a lot about handling asynchronous blockchain transactions in React, ensuring the user interface remains responsive while waiting for blocks to be mined. Overall, this project solidified my understanding of full-stack Web3 architecture."

---

## Slide 7: Q&A
**Slide Content:**
- Thank You!
- Questions?

**🗣️ What you say (Speaker Script):**
> "Thank you for listening. I'd now like to open the floor to any questions regarding the smart contract logic, the frontend implementation, or the Web3 integration."
