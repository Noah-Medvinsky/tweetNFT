
import { expect } from "chai";

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    console.log("check1" +owner)
    const Token = await ethers.getContractFactory("tweetNFT")
    console.log("check")
    const token = await Token.attach("0x5c04C0Dc4c1dF62b8D697D29534244FEB6721978")
   
    //await token.setURI("ipfs.moralis.io:2053/ipfs/QmRUvuD5FZSfgJNkzavxAqVmg28NU1FVWRWeYaDRuAd3Sk");
    let gettokenURI = await token.tokenURI(4);
    console.log("tokenURI is now "+gettokenURI)
    
    
    let res = await token.mintNFT(owner.address, "ipfs://QmQJ37AarKH5vB7Q1YcrWLVzagRojctTPY8ydmNJhuiuTn/5");
    console.log("after"+JSON.stringify(res));
   
    
  
    expect("h").to.equal("h");
  });
});