import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import MintNFT from './components/MintNFT'
import Marketplace from './components/Marketplace'
import MyNFTs from './components/MyNFTs'
import contractData from './contractData.json'

const abi = contractData.abi;

// Address of the deployed contract (You will need to update this after deploying to local/testnet)
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState("0.00")
  const [contract, setContract] = useState(null)
  const [activeTab, setActiveTab] = useState('market')

  const fetchBalance = async (acc) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const balanceWei = await provider.getBalance(acc)
      setBalance(Number(ethers.formatEther(balanceWei)).toFixed(4))
    } catch (error) {
      console.error("Failed to fetch balance", error)
    }
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
        fetchBalance(accounts[0])
        
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        
        const nftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
        setContract(nftContract)
      } catch (error) {
        console.error("Error connecting to MetaMask", error)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          fetchBalance(accounts[0])
          // Re-instantiate contract with new signer
          const provider = new ethers.BrowserProvider(window.ethereum)
          provider.getSigner().then(signer => {
            setContract(new ethers.Contract(CONTRACT_ADDRESS, abi, signer))
          })
        } else {
          setAccount(null)
          setContract(null)
          setBalance("0.00")
        }
      })
    }
  }, [])

  // Refetch balance when returning to market to see updates
  useEffect(() => {
    if (account && activeTab === 'market') {
      fetchBalance(account)
    }
  }, [activeTab, account])

  return (
    <div className="App">
      <header className="app-header">
        <div className="logo">TechTuneNFT Market</div>
        <div>
          {account ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--success)' }}>{balance} ETH</span>
              <button className="btn-secondary">
                {account.substring(0, 6)}...{account.substring(account.length - 4)}
              </button>
            </div>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      </header>

      {account ? (
        <main className="animate-fade-in">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'market' ? 'active' : ''}`}
              onClick={() => setActiveTab('market')}
            >
              Marketplace
            </button>
            <button 
              className={`nav-tab ${activeTab === 'mint' ? 'active' : ''}`}
              onClick={() => setActiveTab('mint')}
            >
              Mint NFT
            </button>
            <button 
              className={`nav-tab ${activeTab === 'my-nfts' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-nfts')}
            >
              My NFTs
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'market' && <Marketplace contract={contract} account={account} />}
            {activeTab === 'mint' && <MintNFT contract={contract} setActiveTab={setActiveTab} />}
            {activeTab === 'my-nfts' && <MyNFTs contract={contract} account={account} />}
          </div>
        </main>
      ) : (
        <div className="empty-state animate-fade-in glass">
          <h2>Welcome to TechTuneNFT Marketplace</h2>
          <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            Connect your Web3 wallet to explore, mint, buy, and sell exclusive digital assets.
          </p>
          <button onClick={connectWallet}>Connect to Start</button>
        </div>
      )}
    </div>
  )
}

export default App
