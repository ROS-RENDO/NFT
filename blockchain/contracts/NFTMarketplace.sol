// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    struct Listing {
        uint256 tokenId;
        string name;
        uint256 price;
        address seller;
        address owner;
        bool isListed;
        string tokenURI;
    }

    mapping(uint256 => Listing) public listings;

    event NFTMinted(uint256 indexed tokenId, string name, uint256 price, address seller);
    event NFTListed(uint256 indexed tokenId, uint256 price, address seller);
    event NFTSold(uint256 indexed tokenId, uint256 price, address seller, address buyer);

    constructor() ERC721("TechTuneNFT", "TTN") Ownable(msg.sender) {}

    function mintNFT(string memory _tokenURI, string memory _name, uint256 _price) public returns (uint256) {
        require(_price > 0, "Price must be greater than 0");
        
        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

        listings[newTokenId] = Listing({
            tokenId: newTokenId,
            name: _name,
            price: _price,
            seller: msg.sender,
            owner: msg.sender,
            isListed: true,
            tokenURI: _tokenURI
        });

        // Escrow the NFT in the contract while listed
        _transfer(msg.sender, address(this), newTokenId);

        emit NFTMinted(newTokenId, _name, _price, msg.sender);
        
        return newTokenId;
    }

    function listNFT(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender, "You do not own this NFT");
        require(_price > 0, "Price must be greater than 0");

        listings[_tokenId].price = _price;
        listings[_tokenId].seller = msg.sender;
        listings[_tokenId].isListed = true;

        // Escrow the NFT in the contract while listed
        _transfer(msg.sender, address(this), _tokenId);

        emit NFTListed(_tokenId, _price, msg.sender);
    }

    function buyNFT(uint256 _tokenId) public payable {
        Listing storage listing = listings[_tokenId];
        require(listing.isListed, "NFT is not for sale");
        require(msg.value == listing.price, "Please submit the exact asking price");

        address seller = listing.seller;
        listing.isListed = false;
        listing.owner = msg.sender;
        listing.seller = address(0);

        // Transfer funds to the seller
        payable(seller).transfer(msg.value);

        // Transfer NFT from contract to buyer
        _transfer(address(this), msg.sender, _tokenId);

        emit NFTSold(_tokenId, listing.price, seller, msg.sender);
    }

    function unlistNFT(uint256 _tokenId) public {
        Listing storage listing = listings[_tokenId];
        require(listing.isListed, "NFT is not for sale");
        require(listing.seller == msg.sender, "You are not the seller");

        listing.isListed = false;
        
        // Return the NFT to the seller
        _transfer(address(this), msg.sender, _tokenId);
    }

    function getListedNFTs() public view returns (Listing[] memory) {
        uint256 totalItemCount = _tokenIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (listings[i].isListed) {
                itemCount += 1;
            }
        }

        Listing[] memory items = new Listing[](itemCount);

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (listings[i].isListed) {
                items[currentIndex] = listings[i];
                currentIndex += 1;
            }
        }
        return items;
    }

    function getMyNFTs(address _user) public view returns (Listing[] memory) {
        uint256 totalItemCount = _tokenIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (listings[i].owner == _user && !listings[i].isListed) {
                itemCount += 1;
            }
        }

        Listing[] memory items = new Listing[](itemCount);

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (listings[i].owner == _user && !listings[i].isListed) {
                items[currentIndex] = listings[i];
                currentIndex += 1;
            }
        }
        return items;
    }
}
