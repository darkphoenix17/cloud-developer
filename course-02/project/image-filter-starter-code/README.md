# Udagram Image Filtering Microservice Project


### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`
3. build the project (once succesfully checked and tested on post-man) with `npm run build`


### Elasticbean stalk url

[Image Microservices endpoint] (http://udacity-c2-image-filter-dev.ap-south-1.elasticbeanstalk.com/)

[Test it with the url in the rubric] (http://udacity-c2-image-filter-dev.ap-south-1.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg)


 ### Changes made:

 - Implemented a RESTFUL Endpoint in the server.ts
 - Used a package to verify that the url is valid or not in server.ts
 - Updated the config.yml with deploy attribute
 - Also made the changes to the postman_collection.json file 


### How this was deployed
 `eb init`
 `eb create` 
 `eb deploy` 