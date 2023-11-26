import Moralis from "moralis";
import fs from "fs";

async function uploadToIpfs() {

    await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjM1NTU1NDdkLTNkOTktNDgxMi04M2YwLTgzNjNmNTM4ZmI3ZiIsIm9yZ0lkIjoiMzY1NzA3IiwidXNlcklkIjoiMzc1ODUwIiwidHlwZUlkIjoiNzNmNzEzOTMtZTA3Mi00NGY1LWFlMzYtNzU5YjE1NWE5OTk0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDA4NTk2MjgsImV4cCI6NDg1NjYxOTYyOH0.WPdCv3EdjEod6IHBNMdwl_iDjeLUbWg62U3UW0VkLnE",
    });

    const uploadArray = [
        {
            path: "otter.png",
            content: fs.readFileSync('./otter.png', {encoding: 'base64'})
        },
        {
            path: "5",
            content: {
                name: "NFT Art",
                description: "This is supposed to be a generic description of a tweet",
                image: "ipfs://QmYHGtvwxnnXzkEjSwrEBAHrFo7Hfrzx5JZdrLm1qNuheX/otter.png"
            },
        },
        
    ];
    
    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });

    console.log(response.result)
    
}

uploadToIpfs();