import fs from 'fs';
import screenshot from 'electron-screenshot-service';

screenshot({
  url : 'http://localhost:8080',
  width : 1024,
  height : 768
})
.then(function(img){
  fs.writeFile('./quote.png', img.data, function(err){
    if(err) {
      console.log("There was a problem", err);
    } else {
      console.log("Done.");
    }
    screenshot.close();
  });
});
