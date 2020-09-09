<h1 align="center">ExpressJS - Blanja RESTfull API</h1>



Blanja is an Online Shop Aplication specially for backend only. Build with NodeJs using the ExpressJs Framework
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `yarn install`'
3. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
4. Create a database with the name ecommerce, and import file at folder sql ecom.sql to **phpmyadmin**
5. Open Postman desktop application or Chrome web app extension that has installed before
6. Choose HTTP Method and enter request url.(ex. localhost:8080/)
7. You can see all the end point [here](#end-point)


## End Point
**1. GET**

* `/item`(Get item with param querys)


* `/item:id`(Get item by Id)



**2. POST**

* `/item` (User)
    * ``` { "name": "ASUS ROG", "price": 3000000, "description": "Asus rog is ....."} ```




**3. PUT**

* `/item:id` (Update all item by id)

     * `{ "name": "ASUS ROG", "price": 3000000, "description": "Asus rog is ....."}`




**4. PATCH**

* `/item/:id` (Update one or more item by id)
  
   * `{ "name": "ASUS ROG", "price": 3000000, "description": "Asus rog is ....."}`
   
   

**5. DELETE**

* `/item/:id` (Delete item by id)

  
