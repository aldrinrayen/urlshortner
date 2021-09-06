# urlshortner
shorten url
Step 1:
npm install 

step 2:
Add DB config files in \config\db.config.js

step 3:
Add site config files in \config\site.config.js


step 4:
npm start 
Note: Service will be started in 3000 port in default



To Access APIs:

1. jwt
To get Auth Key for APIs
Method: POST

Parameters
url: http://localhost:3000/jwt

Headers: authkey: LNJn2VzBiiJUxU382BHA

2. shorten_url
Method: POST

Parameters
url: http://localhost:3000/shorten_url

body: { "longurl": "https://www.linkedin.com/in/aldrin-rayen-910ab6b5/", "email": "aldrin@gmail.com" }

Headers: { "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJib2J5IiwiaWF0IjoxNjMwOTYzMjc1fQ.DPsST-tT637blXrTY5QRT4TLHMh0q-8aX6RFHehGsZQ"}

3. shorten_url_list
Method: GET

Parameters
url: http://localhost:3000/shorten_url

body: { "email": "aldrin@gmail.com" }

Headers: { "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJib2J5IiwiaWF0IjoxNjMwOTYzMjc1fQ.DPsST-tT637blXrTY5QRT4TLHMh0q-8aX6RFHehGsZQ"}


