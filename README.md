# Background - An app for your desktop
There are two parts to the app, a small HTML / JS (React) app that reads JSON files and renders the page based on them and a very small node app that loads a page and spits out an image of the page.

To run it, install node, newest version or... whatever version you want probably.

```
cd app
npm install
npm run dev
```
If you're lucky you now have a server running on localhost:8080 with a big picture of the Buddha.

To get a screenshot of it, open a new terminal and
```
brew install phantomjs
cd server
npm install
npm start
```

If you're really lucky you will now have an image file in the server directory that's somewhat representational of the webpage running on the other sever. At the time I am writing this, it's pretty buggy in that the image is only the top 60 pixels or so of the webpage.

## image/json bundles
putting paired jpg/json files in images
cd images ; ./linkit.sh  will swap out app/source.json and put a symlink to the image in app/public/images

## Thoughts on the future of the app
- How to organize quotations /images into categories that can be mixed and matched
- What other widgets are useful? Weather? News? Sports? KISS and stay w/ image and quote?

Also, by way of full disclosure, there are competitors to this in the app store and they don't seem to be especially thriving. I think we can differentiate enough to sell, but that could just be me.pm start
