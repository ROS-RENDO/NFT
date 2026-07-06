import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export default function Marketplace({ contract, account }) {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)

  const loadMarketplaceItems = async () => {
    if (!contract) return
    setLoading(true)
    try {
      const items = await contract.getListedNFTs()
      const formattedItems = items.map(item => ({
        tokenId: item.tokenId.toString(),
        name: item.name,
        price: ethers.formatEther(item.price.toString()),
        seller: item.seller,
        owner: item.owner,
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
    loadMarketplaceItems()
  }, [contract])

  const buyNft = async (nft) => {
    try {
      const priceInWei = ethers.parseEther(nft.price)
      const tx = await contract.buyNFT(nft.tokenId, { value: priceInWei })
      await tx.wait()
      alert('Successfully bought NFT!')
      loadMarketplaceItems()
    } catch (err) {
      console.error(err)
      alert('Failed to buy NFT')
    }
  }

  if (loading) return <div className="empty-state">Loading marketplace...</div>
  if (nfts.length === 0) return <div className="empty-state glass">No NFTs currently listed for sale.</div>

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
            <p>Seller: {nft.seller.substring(0, 6)}...{nft.seller.substring(nft.seller.length - 4)}</p>
            <div className="nft-price">{nft.price} ETH</div>
            {nft.seller.toLowerCase() === account?.toLowerCase() ? (
              <button disabled style={{ width: '100%' }}>Your Listing</button>
            ) : (
              <button onClick={() => buyNft(nft)} style={{ width: '100%' }}>Buy Now</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
