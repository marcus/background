rm ../app/public/images/$1.jpg
ln -s `pwd`/$1.jpg ../app/public/images/$1.jpg
rm ../app/source.json
ln -s `pwd`/$1.json ../app/source.json
