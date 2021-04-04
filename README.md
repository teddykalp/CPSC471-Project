# CPSC471-Project V1.0

## Before you start work:
Always do the following:

git pull
npm install

### Git commands:
git add <filename> or git add .
  
git commit -m "some commit message"

git push

### For bigger features work should be done on a seperate branch and tested before merging to master
git branch <newbranchname>
git checkout <newbranchname>

### To merge branch back into master
git checkout master
git merge <newbranchname>


## To run the server
Run the command "node server.js" or "nodemon server.js"

## Connecting the client

PORT - The port number you see in your console when you run the server

### The following pages currently are dummy pages that have some implemented functionality

localhost:PORT/scheduleManager

### The following pages currently are pages that have FULL functionality (talks to to server and retrieves data through RESTful API)

localhost:PORT/ 

localhost:PORT/ 

localhost:PORT/manager 

localhost:PORT/payHistory

localhost:PORT/crudEmployee


