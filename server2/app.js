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

  
  

  const email = req.body.email;
  console.log("email=" + email);
  console.log(req.body);
 
  const ethAddress = req.body.walletAddress;
  console.log("add is "+ethAddress)
  const gp = await import('../generatePic.js');
  const uploadIpfs= await import('../ipfs_upload.js')
  const nft = await import('../test/mintNFT.js');
  const tweet = await import('../tweet.js');
  
  let text = await tweet.getTweetText(email);
  console.log(text);
 
  gp.test();
 
  let url= await gp.main(text);
  console.log(url)
  console.log("downloaded IMage is now" )
  let temp = await gp.downloadImage(url)
  let ipfs = await uploadIpfs.uploadToIpfs(temp);
  let tokenId = await nft.run(ipfs, ethAddress);
  console.log("the tokenID is ??: ",tokenId.tokenIdAsNumber)
  console.log("stringify"+tokenId.nftAddress)
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
        
        <h2>How to View Your NFT:</h2>
        <ol>
          <li>Visit a compatible NFT marketplace or wallet.</li>
          <li>Use the provided NFT address and ID to search for your NFT.</li>
          <li>Enjoy your unique digital collectible!</li>
        </ol>
        
        <!-- Add more formatted content as needed -->
      </body>
    </html>
  `;

  // Send the formatted HTML as the response
  res.send(replyHTML);
})


app.listen(80);



module.exports = app;
