var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'nMLiAA9j9i8Q4ukBU2pFxd3K1',
  consumer_secret: 'b75gZb1t6L1jlRwnGxntNbcFaYQ1On8MCPaDoyGF2P5b063fe3',
  access_token_key: '18308817-0Lx89oMuKkJJ5v17UJCYlxMNxcwNiyZvkEFEqDnrr',
  access_token_secret: 'Yr5Q69QQQUJsWo1RdH095Opezs8JDMAIqnCYqJ9MmDdIR'
});

client.stream('statuses/filter', {track: '#trailhead'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});