#create image
docker build -t express-api:<TAG_NUMBER> .

#create container from the image you just built
docker run -p <PORT>:8080 -d express-api:<TAG_NUMBER>

#check container
localhost:<PORT>
