# Univent

This is the api for Univent App.



### How to use the API:

To get all events : make a **GET** request @ `/api/event`

To get an event : make a **GET** request @ `/api/event/<id_of_event>`

To add a new event : make a **POST** request @ `/api/event`

To edit an event put : make a **PUT** request @ `/api/event/<id_of_event>`

To delete an event : make a **DELETE** request @ `/api/event/<id_of_event>`

To filter events : make a **GET** request @ `/api/event/?<property>=<value>` and to add multiple properties together use the `&` symbol `/api/event/?<property1>=<value1>&<property2>=<value2>`



Structure of the JSON object to be sent to the server :
```
	"name": "IMpulse2.0",
	"college": "MAIT_delhi",
	"venue": "MAIT, Rohini",
	"discription":"BEst fest",
	"society": "IOSD",
	"link": "google.com"
```
Structure of the data to be recived from the server :
```
	"_id":"5b3cb96f093d4602b351afc6",
	"name": "IMpulse2.0",
	"college": "MAIT_delhi",
	"venue": "MAIT, Rohini",
	"discription":"BEst fest",
	"society": "IOSD",
	"link": "google.com"
```
