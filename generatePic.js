import OpenAI from "openai";
import axios from 'axios';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pkg from '../conf.js';
const { openAIKEY } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const openai = new OpenAI({apiKey: openAIKEY});


async function main(prompt) {
  const image = await openai.images.generate({ model: "dall-e-3", prompt: prompt });


  return image.data[0].url
}




// Replace 'image_url_here' with the actual URL of the image you want to download
const imageUrl = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-6pwyyqRbI7FlLrajbWFudZZF/user-Hwi1gqY210xk6QioNHaiNbMD/img-k5EIoWPbUlACoP54F0rHcZmZ.png?st=2023-11-23T22%3A54%3A05Z&se=2023-11-24T00%3A54%3A05Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-23T00%3A30%3A36Z&ske=2023-11-24T00%3A30%3A36Z&sks=b&skv=2021-08-06&sig=a4HwTjr1hl9/bGCEgx/ooqx3eEL/V7x2kgIbu5pDmv0%3D';

async function downloadImage(url) {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer', // Set the response type to arraybuffer to handle binary data
    });

    // Determine the file extension based on the content type
    const contentType = response.headers['content-type'];
    const extension = contentType.split('/')[1]; // Assume the content type is like "image/png" or "image/jpeg"

    // Combine the output path with the filename
    const outputPath = path.join(__dirname, `downloaded_image.${extension}`);

    // Write the binary data to a file
    fs.writeFileSync(outputPath, response.data);

    console.log(`Image downloaded and saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error downloading image:', error.message);
  }
}
export { main, downloadImage }; 

