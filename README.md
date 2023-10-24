This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## The app is deployed at: 
[online-store-2-0.vercel.app](https://online-store-2-0.vercel.app/registration)

## Problem Statement:

Providing an web service which would allow the customers to shop online.

## Product Requirements:

This application should allow users to:

* Find the products they need by categories
* Find the products they need by a keyword using a search bar
* Check and edit user’s information
* Purchase the products in needed quantities
* Check the purchase history

## High level system architecture

The architecture diagram for this app can be found [here](https://link.excalidraw.com/readonly/qU1W8ED3y0PhK3PLMm1b).
  
## Data Models

The daba model diagram for this app can be found [here](https://link.excalidraw.com/readonly/QKRp7vLCkWncEXjW5BXX).

## API Definitions

API’s structure: 

* userData : manipulates user data stored in the db : 
   - GET /userData/getuser/\[userId\] : gets user data from the DB to display the profile page;
   - GET /userData/getpurchases/\[userId\] : gets user purchase history (if exists);
   - POST /userData/register/\[userId\] : saves the initial data about the user;
   - POST /userData/savePurchase/\[userId\] : saves a purchase record;
   - PATCH /userdata/\[userId\] : allows to add/edit user information in the DB;

* products : getting the products data from the db upon website navigation; structuring products data for different pages of the UI; sorting the products data upon user’s interaction with the UI:
   - GET /products/homepage : gets the bestsellers and recommended products;
   - GET /products/searched : gets the products based on the user’s search by keywords;
   - GET /products/categorypage : gets the products for a specific category;

* payment  : processing payment; saving the purchased items to the userData section of the DB;

## Risks

There are a few risks to consider in this application so far:
* Performance risks due to a large size of the DB and potentially big chunks of data requested by users
* Predictability of the UX risks due to usage of the third-party prebuilt components (Material UI)


## Alternatives

For the storage of our products and user’s data there were a few choices including relational DBs like MySQL and PostgreSQL and noSQL DBs like MongoDB, Amazon DynamoDB and Firebase. Eventually we chose the Firebase because for the following reasons:
* noSQL structure which is more suitable for our data model based on a large amount of deeply nested objects (in contrast to all relational DBs listed above);
* Ability to set up user authentication in the same platform and integrate it with the DB interactions (in contrast to Amazon DynamoDB);