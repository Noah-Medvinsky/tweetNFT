import { main, downloadImage } from './generatePic.js';
import {uploadToIpfs} from './ipfs_upload.js';
import {mint} from './test/mintNFT.js';
async function generatePic(){
    
    let prompt = "I like taking hikes in mountains";
    let url= await main(prompt);
    console.log(url)
    console.log("downloaded IMage is now")
    let temp = await downloadImage(url)
    //console.log(JSON.stringify(temp))
    let ipfs = await uploadToIpfs(temp);
    
    
    await mint(ipfs);

}
generatePic();

