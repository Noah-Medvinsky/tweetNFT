import Moralis from "moralis";
import fs from "fs";

async function uploadToIpfs() {

    await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjM1NTU1NDdkLTNkOTktNDgxMi04M2YwLTgzNjNmNTM4ZmI3ZiIsIm9yZ0lkIjoiMzY1NzA3IiwidXNlcklkIjoiMzc1ODUwIiwidHlwZUlkIjoiNzNmNzEzOTMtZTA3Mi00NGY1LWFlMzYtNzU5YjE1NWE5OTk0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDA4NTk2MjgsImV4cCI6NDg1NjYxOTYyOH0.WPdCv3EdjEod6IHBNMdwl_iDjeLUbWg62U3UW0VkLnE",
    });

    const uploadArray = [
        {
            path: "downloaded_image.png",
            content: fs.readFileSync('./downloaded_image.png', {encoding: 'base64'})
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
                description: "This is supposed to be a generic description of a tweet",
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