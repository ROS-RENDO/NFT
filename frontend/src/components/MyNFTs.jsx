import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export default function MyNFTs({ contract, account }) {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)
  const [listingData, setListingData] = useState({})

  const loadMyNFTs = async () => {
    if (!contract || !account) return
    setLoading(true)
    try {
      const items = await contract.getMyNFTs(account)
      const formattedItems = items.map(item => ({
        tokenId: item.tokenId.toString(),
        name: item.name,
        price: ethers.formatEther(item.price.toString()),
        imageURI: item.tokenURI
      }))
      setNfts(formattedItems)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMyNFTs()
  }, [contract, account])

  const handleList = async (tokenId) => {
    try {
      const price = listingData[tokenId]
      if (!price || isNaN(price) || Number(price) <= 0) {
        alert('Please enter a valid price')
        return
      }
      
      const priceInWei = ethers.parseEther(price.toString())
      const tx = await contract.listNFT(tokenId, priceInWei)
      await tx.wait()
      alert('NFT listed for sale!')
      loadMyNFTs()
    } catch (err) {
      console.error(err)
      alert('Failed to list NFT')
    }
  }

  if (loading) return <div className="empty-state">Loading your NFTs...</div>
  if (nfts.length === 0) return <div className="empty-state glass">You don't own any unlisted NFTs.</div>

  return (
    <div className="nft-grid">
      {nfts.map((nft, idx) => (
        <div key={idx} className="glass-card animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
          <img 
            src={nft.imageURI} 
            alt={nft.name} 
            className="nft-image"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image' }}
          />
          <div className="nft-info">
            <h3>{nft.name}</h3>
            
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <input 
                type="number" 
                placeholder="Price in ETH"
                style={{ 
                  flex: 1, 
                  padding: '0.5rem', 
                  borderRadius: '6px', 
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'white'
                }}
                onChange={(e) => setListingData({...listingData, [nft.tokenId]: e.target.value})}
              />
              <button onClick={() => handleList(nft.tokenId)}>List</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
