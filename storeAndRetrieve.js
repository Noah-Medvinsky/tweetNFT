import * as IPFS from 'ipfs-core';
import fs from "fs";
import { checkServerIdentity } from 'tls';


async function main() {
    const node = await IPFS.create();
    
  
    
  
    const uploadArray = 
      {
          path: "otter.png",
          content: fs.readFileSync('./otter.png', {encoding: 'base64'})
      }
      
      
  const add=  await node.add(uploadArray)
  console.log("add is ", add)
      let cid = '/ipfs/QmfQYcTprm375UiLrYbkdKbtyRYrXdSr6zvDpSxu7dFmde'
    

  const res = await node.name.publish(cid)
    
    console.log(`https://gateway.ipfs.io/ipns/${res.name}`)
      

    console.log("Added file:");
  }
  main();