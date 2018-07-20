# Univent

This is the api for Univent App.



### How to use the API:

## Event Routes : 

To get all events : make a **GET** request @ `/api/event`

To get an event : make a **GET** request @ `/api/event/<id_of_event>`

To add a new event __*requires auth header*__ : make a **POST** request @ `/api/event`

To edit an event put __*requires auth header*__ : make a **PUT** request @ `/api/event/<id_of_event>`

To delete an event  __*requires auth header*__ : make a **DELETE** request @ `/api/event/<id_of_event>`

To filter events : make a **GET** request @ `/api/event/?<property>=<value>` and to add multiple properties together use the `&` symbol `/api/event/?<property1>=<value1>&<property2>=<value2>`


## User Routes :

To register a User : make a **POST** request @ `/api/user/register`

To login a User : make a **POST** request @ `/api/user/login`

To get current User __*requires auth header*__ : make a **GET** request @ `/api/user/current`

To get delete User __*requires auth header*__ : make a **DELETE** request @ `/api/user/current` with authentication token in header `key : Authorization value : token `


## Profile Routes :

To add Profile __*requires auth header*__ : make a **POST** request @ `/api/profile/`

To get current User Profile __*requires auth header*__ : make a **GET** request @ `/api/profile/`
