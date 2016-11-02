![cf](http://i.imgur.com/7v5ASc8.png) Express with Mongo/Mongoose/Models
====

1. Create a new express app that's backed by Mongo using Mongoose. You can reference the previous lab,
but you should write this from scratch, don't just copy and paste code from previous project.

2. Add a second resource (for example, `/pirates` and `/crews`, or `/users` and `/cats`).

Use the Mongoose promise API

##Description

Be sure to implement full REST operations for each resource (`GET`/`GET id`/`POST`/`PUT`/`DELETE`)

Enforce required fields and validation (e.g. a users age should not negative), 
return meaningful errors.

This is pretty open to interpretation. 

Finally, implement a non CRUD endpoint (meaning one that is does not simply 
Create, Read, Update, or Destroy information in your database). 
When a user hits a url endpoint, the server will do something with the data 
that is not a CRUD operation and return the data. 

For example,  `/users/averageAge` might return the average age of all users. This could 
be something that happens in JavaScript, or using advanced features of Mongoose.

Models should be unit tested.

REST API's should be E2E tested.

## Bonus

* Make at least one of your resources queryable on a list `GET`,
eg `/birds&flightless=true` **2pts**

##Rubric
* Use of Mongo/Mongoose/Models: **4pts**
* non-CRUD endpoint: **1pts**
* Tests: **3pts**
* Code Quality/Project Organization: **2pts**
