# Gentz-Website
Website for the band gentz


To use this website add a ".env" file: 

PORT=?(Number ex: 3006)
ADMIN_USER="?"(string used for login in admin panel)
ADMIN_PASS="?"(string used for login in admin panel)
DATABASE_URL="mongodb://?/?"(mongo db link like mongodb://localhost/gentz)
COOKIE_SECRET="?" (Just a random string of random length you have to insert)

And add a "press.md", "intro.md" and "contact.md" file to the /routes/cp folder. (They are now already included)

install mongodb, and simply start it, you have to do nothing else

Then cd to the folder and execute gentz.js to start the website or start with any other nodejs start app. Then go to localhost:PORT.
