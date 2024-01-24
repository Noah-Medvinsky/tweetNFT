import Moralis from "moralis";

import pkg from '../conf.js';
const { moralisKey } = pkg;

await Moralis.start({
    apiKey: moralisKey,
});

async function uploadToIpfs(data, text) {

   

    const uploadArray = [
        {
            path: "downloaded_image.png",
            content:  data
        }
    ];
    

    
    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });

    console.log(response.result[0].path)
    let url = response.result[0].path
    let match = url.match(/\/ipfs\/([^\/]+)/);
    console.log("math is ",match[1])

    let imageURL = "ipfs://" + match[1] + "/downloaded_image.png"
    console.log("image URL is",imageURL)
    const uploadJSON = [
        {
            path: "1",
            content: {
                name: "NFT Art",
                description: text,
                image: url
            },
        }
    ]
    const secondResponse = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadJSON,
    });
    console.log(secondResponse.result);
    url = secondResponse.result[0].path
    match = url.match(/\/ipfs\/([^\/]+)/);
    return url

}

export { uploadToIpfs};     