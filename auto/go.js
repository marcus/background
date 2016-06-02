import req from 'request';
import Promise from 'bluebird';
import nlp from 'nlp_compromise';

let request = Promise.promisify(req);

let body = {
  "size": {
    "width": 1280,
    "height": 960
  },
  "quotation": {
    "text": null,
    "attribution": null,
    "source": {
      "title": null,
      "url": null
    }
  },
  "image": {
    "url": "",
    "path": null
  }
};

const quoteParams = {
  uri: 'http://quotes.stormconsultancy.co.uk/random.json',
  method: 'get',
  json: true,
  timeout: 5000,
};

const API_KEY = '2679522-a551d1fcc1a002cb6caf51c2b';
let getPicParams = function(term = 'nature') {
  return ({
    uri: `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(term)}&safesearch=true&orientation=horizontal&image_type=photo&per_page=100`,
    method: 'get',
    json: true,
    timeout: 10000,
  });
};


let src = Object.assign({}, body);
const backgroundParams = {
  uri: 'http://localhost:3000/print',
  method: 'post',
  json: true,
  timeout: 16000,
  body: src,
};

request(quoteParams)
  .then((res) => {
    let quote = res.body;
    console.log(quote);
    src.quotation.text = quote.quote;
    src.quotation.attribution = quote.author;
    src.quotation.source.url = quote.permalink;
    src.quotation.source.title = "Storm Consultancy";
    let termIndex = nlp.text(quote.quote).tags()[0].findIndex((t) => t === 'Noun') || 3;
    let term = quote.quote.split(' ')[termIndex];
    term = nlp.noun(term).singularize();
    console.log("Using term", term);
    return request(getPicParams(term));
  })
  .then((res) => {
    if(res.body.hits && res.body.hits.length) {
      console.log('Image tags', res.body.hits[0].tags);
      let hitCount = res.body.hits.length;
      src.image.url = res.body.hits[parseInt(Math.random() * hitCount + 1)].webformatURL;
      return request(backgroundParams);
    } else {
      throw new Error(`No images found for this term`);
    }
  })
  .then((res) => {
    console.log("Done", res.body);
  })
  .catch((err) => {
    console.log("Error, try again", err.message);
  })
  ;
