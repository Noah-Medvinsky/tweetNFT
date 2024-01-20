import axios from 'axios';

const getTweetText = async (tweetUrl) => {
  try {
    // Make a request to the Twitter API's oEmbed endpoint
    const response = await axios.get(`https://publish.twitter.com/oembed?url=${tweetUrl}`);

    // Extract the text from the HTML response and remove extra information
    const tweetHtml = response.data.html;
    const tweetText = tweetHtml.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const cleanedText = tweetText.match(/^(.*?)(?=\s*pic.twitter\.com|$)/)?.[1].trim(); // Extract tweet content

    return cleanedText || 'No tweet content found.';
  } catch (error) {
    console.error('Error fetching tweet:', error.message);
    return null;
  }
};



export {getTweetText}; 