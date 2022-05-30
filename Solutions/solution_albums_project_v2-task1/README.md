# Task 1

Create and implement a "User" model in the `backend` directory of your new "Albums Project v2" repo!

For now, we will only implement the model when we want to **register** a new user.

## Instructions

1. Install `mongoose` into the `backend` directory of your "albums project v2" repo using npm.
2. Use mongoose in `index.js` to connect to a db called "albums-project" in MongoDB.
3. Inside the `backend` directory, create a `models` directory and add a file called `User.js`.
4. In `User,js`, import `mongoose` and use it to create a **schema** to define how a "User" document should look in your database.
    - What keys do you need to create a "User" document? Also, make sure all the keys are required!
5. Create a **model**, based on the schema, to provide an interface to a collection called `users`.
6. Import your model into `/controllers/registerController.js`.
7. Rewrite the `registerPost` controller function to use your model!
    - New "user" documents should now be saved in the `users` collection of your MongoDB database, instead of the `/data/db.json` file. To do this, you will need to use your **model** to replace all parts of the function currently using LowDB.
    - Remove all parts of the code which are no longer relevant (e.g. imports which are no longer needed, anything we do not need to handle ourselves as MongoDB will automatically handle it...)  
    - Make sure to also add extra **error handling**, in case something goes wrong when using your model to:
        - find your user, or 
        - save your user.
8. Test your changes using **Postman**.
    - Make sure that when you create a user correctly, you receive back a response containing that user's details, **plus**, `albums`, `_id` and `_v` fields.
    - Also try to create a user document without some of the correct fields, and make sure your error handling is working as expected.
    - You can look in the "exercises" Slack channel for examples of how successful and unsuccessful responses should look in Postman. :-)

---

Please copy all tasks into this file! This will create a record of the work you did to complete the project.

Each new task should go to the top of the file. :-)