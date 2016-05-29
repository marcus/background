import webshot from 'webshot';

let options = {
  windowSize: {
    width: 1624,
    height: 768,
  },
  shotSize: {
    width: 'window',
    height: 'window',
  },
  quality: 100,
  streamType: 'png',
  phantomPath: '/usr/local/bin/phantomjs',
  //userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
    //+ ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
};

webshot('http://localhost:8080', 'quote.png', options, function(err) {
   if(err) {
     console.log(err);
   } else {
     console.log('Done');
   }
});
