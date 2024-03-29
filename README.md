# Background - An app for your desktop
There are two parts to the app, a small HTML / JS (React) app that reads JSON files and renders the page based on them and a very small node app that loads a page and spits out an image of the page.

To run it, install node, newest version or... whatever version you want probably.

```
cd app
mkdir blueprints
mkdir public/quotes
npm install
npm start
```
You should now have a server running on localhost:3000 with a big picture of the Buddha.

To get a screenshot, open an API client like Postman and POST to http://localhost:3000/print
```
{
  "size": {
    "width": 1280,
    "height": 960
  },
  "quotation": {
    "text": "I don't know where I'm going from here, but I promise it won't be boring.",
    "attribution": "David Bowie",
    "source": {
      "title": "",
      "url": ""
    }
  },
  "image": {
    "url": "",
    "path": "guitar.jpg",
    "source": {
      "title": "",
      "url": ""
    }
  }
}
```

You will now have an image file in the app/public/quotes directory that's representational of what you want.

## TODO
* Honor height / width
* Honor quote / image attribution

## Thoughts on the future of the app
- How to organize quotations /images into categories that can be mixed and matched
- What other widgets are useful? Weather? News? Sports? KISS and stay w/ image and quote?
