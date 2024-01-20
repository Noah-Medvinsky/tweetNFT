import pkg from 'hardhat';
const { ethers } = pkg;

async function mint(url, userAddress, callback) {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("tweetNFT");
    const token = await Token.attach("0x5c04C0Dc4c1dF62b8D697D29534244FEB6721978");

    let gettokenURI = await token.tokenURI(4);
    console.log("tokenURI is now " + gettokenURI);

    console.log(userAddress);

    let tokenId;  // Variable to store the tokenId
    let nftAddress;  // Variable to store the nftAddress

    // Listen for the MintToken event
    token.on("MintToken", (emittedNftAddress, to, mintedTokenId, event) => {
        console.log("nft address is " + emittedNftAddress);
        console.log("to event is " + to);
        console.log("Minted event received:" + mintedTokenId);

        nftAddress = emittedNftAddress;  // Assign the nftAddress
        tokenId = mintedTokenId;  // Assign the tokenId

        // Invoke the callback function with the tokenId and nftAddress
        if (callback) {
            callback({ tokenId, nftAddress });
        }
    });

    // Mint the NFT
    let res = await token.mintNFT(userAddress, url);
    console.log("after" + JSON.stringify(res));

    // Return a promise (since mint is asynchronous)
    return new Promise((resolve) => {
        // Resolve the promise with an object containing tokenId and nftAddress when the MintToken event is received
        token.on("MintToken", () => {
            resolve({ tokenId, nftAddress });
        });
    });
}

async function run(url, add) {
    let { tokenId, nftAddress } = await mint(url, add);
    let tokenIdAsNumber = Number(tokenId);
    console.log("Token ID:", tokenIdAsNumber);
    console.log("NFT Address:", nftAddress);
    return {tokenIdAsNumber, nftAddress};
}

export { run };
