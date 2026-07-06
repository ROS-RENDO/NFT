import { useState } from 'react'
import { ethers } from 'ethers'

export default function MintNFT({ contract, setActiveTab }) {
  const [formData, setFormData] = useState({ name: '', price: '', imageURI: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleMint = async (e) => {
    e.preventDefault()
    if (!contract) return

    setLoading(true)
    setMessage('')
    try {
      const priceInWei = ethers.parseEther(formData.price.toString())
      const tx = await contract.mintNFT(formData.imageURI, formData.name, priceInWei)
      await tx.wait()
      
      setMessage('NFT Minted & Listed Successfully!')
      setFormData({ name: '', price: '', imageURI: '' })
      
      setTimeout(() => {
        setActiveTab('market')
      }, 2000)
    } catch (err) {
      console.error(err)
      setMessage('Failed to mint NFT. See console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Mint & List a New NFT</h2>
      
      {message && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px', background: message.includes('Success') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: `1px solid ${message.includes('Success') ? 'var(--success)' : 'var(--danger)'}` }}>
          {message}
        </div>
      )}

      <form onSubmit={handleMint}>
        <div className="form-group">
          <label>NFT Name</label>
          <input 
            type="text" 
            required 
            placeholder="e.g. Cyberpunk Monkey"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Price (ETH)</label>
          <input 
            type="number" 
            required 
            step="0.001"
            min="0.001"
            placeholder="0.05"
            value={formData.price}
            onChange={e => setFormData({...formData, price: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            type="url" 
            required 
            placeholder="https://example.com/image.png"
            value={formData.imageURI}
            onChange={e => setFormData({...formData, imageURI: e.target.value})}
          />
        </div>
        
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Minting...' : 'Mint & List for Sale'}
        </button>
      </form>
    </div>
  )
}
