# UniEvent

This is the api for UniEvent App.


## How to use the API:
To get all events : make a get request @ <code>localhost:3000/api/event

To get an event : make a get request @
<code>localhost:3000/api/event/<id_of_event>

To add a new event : make a post request @ <code>localhost:3000/api/event

To edit an event put : make a request @ <code>localhost:3000/api/event/<id_of_event>

To delete an event : make a delete request @ <code>localhost:3000/api/event/<id_of_event>

Structure of the JSON object to be sent to the server :


	{"name": "IMpulse2.0",
	"college": "MAIT_delhi",
	"venue": "MAIT, Rohini",
	"discription":"BEst fest",
	"society": "IOSD",
	"link": "google.com"}

Structure of the data sent from the server :

      {"_id_":"5b3cb96f093d4602b351afc6",
      "name": "IMpulse2.0",
	"college": "MAIT_delhi",
	"venue": "MAIT, Rohini",
	"discription":"BEst fest",
	"society": "IOSD",
	"link": "google.com"}
