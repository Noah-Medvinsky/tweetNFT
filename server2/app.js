const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');





const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
  next(createError(404));
});
*/
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/user', (req, res) => {
  res.send('Hello World! got user request')
})

app.post('/form', async (req, res) => {
  try {
    const email = req.body.email;
    const ethAddress = req.body.walletAddress;

    const gp = await import('../generatePic.js');
    const uploadIpfs = await import('../ipfs_upload.js');
    const nft = await import('../test/mintNFT.js');
    const tweet = await import('../tweet.js');

    let text = await tweet.getTweetText(email);
    gp.test();
    let url = await gp.main(text);
    console.log(url);
    console.log("downloaded Image is now");
    let temp = await gp.downloadImage(url);
    let ipfs = await uploadIpfs.uploadToIpfs(temp, text);
    let tokenId = await nft.run(ipfs, ethAddress);
    console.log("the tokenID is ??: ", tokenId.tokenIdAsNumber);
    console.log("stringify" + tokenId.nftAddress);

    const replyHTML = `
      <html>
        <head>
          <title>Form Submission Reply</title>
        </head>
        <body>
          <h1>Thank you for your submission!</h1>
          <p>Your form data has been received and processed. Your NFT has been minted.</p>
          <h2>NFT Details:</h2>
          <p>NFT Address: ${tokenId.nftAddress}</p>
          <p>NFT ID: ${tokenId.tokenIdAsNumber}</p>
          <h2>How to View Your NFT on OpenSea:</h2>
          <ol>
            <li>Visit <a href="https://opensea.io/" target="_blank">OpenSea</a>.</li>
            <li>Log in or connect your wallet to the platform.</li>
            <li>Use the provided NFT address and ID to search for your NFT.</li>
            <li>Enjoy exploring and showcasing your unique digital collectible!</li>
          </ol>
        </body>
      </html>
    `;

    // Send the formatted HTML as the response
    res.send(replyHTML);
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).send('There was an error with your submission or your tweet likely goes against OpenAi\'s content policy. Please try again with a different tweet');
  }
});



app.listen(80);



module.exports = app;
