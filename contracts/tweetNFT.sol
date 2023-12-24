pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract tweetNFT is ERC721{
    uint256 public tokenId;
    mapping(address => uint256) public ownershipRecord;
    
    string public uri;
    
    
    event MintToken(address nftAddress, address to, uint256 tokenId);
    
    
    constructor() public ERC721("tweetNFT", "HNFT"){
    uri = "ipfs.moralis.io:2053/ipfs/QmPP5QpMs67Eqh18junvriARv6ZQTTCVSr7KpKVsyMq1rx/1";
    }
    
   
    
    function mintNFT(address recipient, string memory url) public {
        require(address(0) != recipient, "invalid address");
       
        
        _mint(recipient, tokenId);
        ownershipRecord[recipient] = tokenId;
        _setTokenURI(tokenId, url);
        
        emit MintToken(address(this), recipient, tokenId);
        tokenId = tokenId+1;
    }
    
    
   
    
    
    function setURI(string memory newURI) public {
        uri=newURI;
    }


}