import pkg from 'hardhat';
const { ethers } = pkg;

async function mint(url) {
    const [owner] = await ethers.getSigners();
    console.log("check1" +JSON.stringify(owner))
    const Token = await ethers.getContractFactory("tweetNFT")
    console.log("check")
    const token = await Token.attach("0x5c04C0Dc4c1dF62b8D697D29534244FEB6721978")
   
    //await token.setURI("ipfs.moralis.io:2053/ipfs/QmRUvuD5FZSfgJNkzavxAqVmg28NU1FVWRWeYaDRuAd3Sk");
    let gettokenURI = await token.tokenURI(4);
    console.log("tokenURI is now "+gettokenURI)
    
    
    let res = await token.mintNFT(owner.address, url);
    console.log("after"+JSON.stringify(res));
   

  }
  export {mint};
