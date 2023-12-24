import { main, downloadImage } from './generatePic.js';
import {uploadToIpfs} from './ipfs_upload.js';
import {mint} from './test/mintNFT.js';
async function generatePic(){
    
    let prompt = "I like taking hikes in mountains";
    let url= await main(prompt);
    console.log(url)
    console.log("downloaded IMage is now")
    await downloadImage(url)
    let ipfs = await uploadToIpfs();
    console.log("ipfs is " +ipfs);
    
    await mint(ipfs);

}
generatePic();

