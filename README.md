# Univent

This is the api for Univent App.



## How to use the API:


### User Routes :

* To register a User : make a **POST** request @ `/api/user/register`

	Format of Data to POST: 

```
{
	"name": "String",
	"email" : "Email",
	"password" : "Password",
	"acc_type" : "Organiser or Patricipant"
}
```

JSON received if POST successful: 
    
```
{
    "_id": "5b544060c1663c04c64cd056",
    "name": "String",
    "email": "Email",
    "password": "$2a$10$deRdNvd6.0KzDRBqonCc.u.bqAw7j1D55R3SSG4jgAD6rnJOObJvG", // hashed Password
    "acc_type": "organiser",
    "reg_date": "2018-07-22T08:29:20.838Z", // registration Date
    "__v": 0
}
```
	If email already exists : `{ "email": "Email already exists" }`

* To login a User : make a **POST** request @ `/api/user/login`

	Format of data to POST: 
```
{	"email" : "fisrt@gmail.com",
	"password" : "12345"
}
```

JSON received if POST successful: 
```
{
    "success": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNTQzMWE1OTA0ZjkzMDQwOWM2OWU0NCIsIm5hbWUiOiJyYXNpayByYWoiLCJlbWFpbCI6ImZpc3J0QGdtYWlsLmNvbSIsImFjY190eXBlIjoib3JnYW5pc2VyIiwiaWF0IjoxNTMyMjQ4Mjc3LCJleHAiOjE1MzIyNTE4Nzd9.RHBMlVXXo-1YpwxnJbPdZ2VJ6Yt7aqTNJ3o6OzbXk4M"
}
```

If email not found : `{ "message": "email not found" }`

If passwords don't match : `{"message": "incorrect password"}`

* To get current User __*requires auth header*__ : make a **GET** request @ `/api/user/current`

	**ADD Token to request HEADER** ==>  *key:  Authorization, value : token*
    
	JSON received if POST successful:
```
{
    "_id": "5b5431a5904f930409c69e44",
    "name": "rasik raj",
    "email": "fisrt@gmail.com",
    "password": "$2a$10$qQsx9COC70Lu0LBVKs9..eYMMEw5nnk4hTiyljninuaLfAXjvzwxK",
    "acc_type": "organiser",
    "reg_date": "2018-07-22T07:26:29.046Z",
    "__v": 0
}
```
	
* To get delete User __*requires auth header*__ : make a **DELETE** request @ `/api/user/current` 
 
	**ADD Token to request HEADER** ==>  *key:  Authorization, value : token*

	JSON received if DELETE successful: `{ "message": "User Deleted"}`
    

### Profile Routes :

* To add Profile __*requires auth header*__ : make a **POST** request @ `/api/profile/`

	**ADD Token to request HEADER** ==>  *key:  Authorization, value : token*

	Format of data :
```
{
	"username" : "String",
	"mobile_number": Number,
	"college" : "String",
	"field_of_study" : "String",
	"year": Number
}
```

JSON received if POST successful: 

```
{
    "_id": "5b5432620042d90418c856f5",
    "user": "5b5431a5904f930409c69e44",
    "username": "String",
    "mobile_number": "2345677",
    "college": "String",
    "field_of_study": "String",
    "year": Number,
    "__v": 0
}
```

* To get current User Profile __*requires auth header*__ : make a **GET** request @ `/api/profile/`

	**ADD Token to request HEADER** ==>  *key:  Authorization, value : token*

	JSON received if GET successful:  

```
{
    "_id": "5b5432620042d90418c856f5",
    "user": "5b5431a5904f930409c69e44",
    "username": "String",
    "mobile_number": "2345677",
    "college": "String",
    "field_of_study": "String",
    "year": Number,
    "__v": 0
}
```

### Event Routes : 

* To get all events : make a **GET** request @ `/api/event`
```
[
    
    {
        "_id": "5b5437e00548ca0460cdfcf5",
        "user": "5b5431a5904f930409c69e44",
        "event_name": "String",
        "host_college": "String",
        "venue": "String",
        "description": "String",
        "society": "String",
        "form_link": "String",
        "cover_link": "String",
        "number_of_participants": Number,
        "date": "DATE : <format : 2018-07-20T17:41:59.716Z >",
        "prizes_worth": "String",
        "__v": 0
    },
    {
        ...obj1
    },
    {
        ...obj2
    },
    {
        ...obj3
    }
]
```

* To get an event : make a **GET** request @ `/api/event/<id_of_event>`

```
{
        "_id": "5b5437e00548ca0460cdfcf5",
        "user": "5b5431a5904f930409c69e44",
        "event_name": "String",
        "host_college": "String",
        "venue": "String",
        "description": "String",
        "society": "String",
        "form_link": "String",
        "cover_link": "String",
        "number_of_participants": Number,
        "date": "DATE : <format : 2018-07-20T17:41:59.716Z >",
        "prizes_worth": "String",
        "__v": 0
    }
```

* To add a new event __*requires auth header*__ : make a **POST** request @ `/api/event`

	**ADD Token to request HEADER** ==>  *key:  Authorization, value : token*

	Format of data to POST :
```
{
	"event_name" : "String",
	"host_college" : "String",
	"venue": "String",
	"description": "String",
	"society": "String",
	"form_link": "String",
	"cover_link": "String",
	"number_of_participants": Number,
	"date": "String format : <2018-07-20T17:41:59.716Z>",
	"prizes_worth": "String"
}
```


JSON received if POST successful: 


```
{
        "_id": "5b5437e00548ca0460cdfcf5",
        "user": "5b5431a5904f930409c69e44",
        "event_name": "String",
        "host_college": "String",
        "venue": "String",
        "description": "String",
        "society": "String",
        "form_link": "String",
        "cover_link": "String",
        "number_of_participants": Number,
        "date": "DATE : <format : 2018-07-20T17:41:59.716Z >",
        "prizes_worth": "String",
        "__v": 0
}
```

JSON sent back if the POST is not authorized : `Unauthorized`


* To edit an event put __*requires auth header*__ : make a **PUT** request @ `/api/event/<id_of_event>`

  **ADD Token to request HEADER** ==>  *key:  Authorization, value : token*

  Format of data to PUT :

```
{
	"event_name" : "String",
	"host_college" : "String",
	"venue": "String",
	"description": "String",
	"society": "String",
	"form_link": "String",
	"cover_link": "String",
	"number_of_participants": Number,
	"date": "String format : <2018-07-20T17:41:59.716Z>",
	"prizes_worth": "String"
}
```

* To delete an event  __*requires auth header*__ : make a **DELETE** request @ `/api/event/<id_of_event>`

	**ADD Token to request HEADER** ==>  *key:  Authorization, value : token*

	JSON sent if DELETE successful: `{ "message": "your event is deleted" }`

* To filter events : make a **GET** request @ `/api/event/?<property>=<value>` and to add multiple properties together use the `&` symbol `/api/event/?<property1>=<value1>&<property2>=<value2>`

	JSON received :
```
[
    {
        "_id": "5b54373f0548ca0460cdfcf2",
        "user": "5b5431a5904f930409c69e44",
        "event_name": "dummy",
        "host_college": "dummy",
        "venue": "dummy",
        "description": "dummy_data",
        "society": "dummy_data",
        "form_link": "https://goo.gl/forms/cbU9RXh7K9sZ7hGE3",
        "cover_link": "https://scontent.fdel3-1.fna.fbcdn.net/v/t1.0-9/36391114_2536659033026208_7478735348894269440_n.jpg?_nc_cat=0&oh=2f734e546e4b7e02e43790f9a6febabc&oe=5BE2EFA6",
        "number_of_participants": 2,
        "date": "2018-07-20T17:41:59.716Z",
        "prizes_worth": "100000",
        "__v": 0
    },
    {
       ...obj2
    }
]
````

