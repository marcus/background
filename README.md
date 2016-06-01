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
If you're lucky you now have a server running on localhost:8080 with a big picture of the Buddha.

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

If you're really lucky you will now have an image file in the app/public/quotes directory that's representational of what you want.

## TODO
* Honor height / width
* Honor quote / image attribution

## image/json bundles
putting paired jpg/json files in images
cd images ; ./linkit.sh  will swap out app/source.json and put a symlink to the image in app/public/images

## Thoughts on the future of the app
- How to organize quotations /images into categories that can be mixed and matched
- What other widgets are useful? Weather? News? Sports? KISS and stay w/ image and quote?

Also, by way of full disclosure, there are competitors to this in the app store and they don't seem to be especially thriving. I think we can differentiate enough to sell, but that could just be me.pm start
