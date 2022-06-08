# Task 8

Now you can update the new `deleteAlbum` controller function in your backend to delete a specific album from the logged-in user's MongoDB document.

- In your controller function, you already have access to (1) the user's `id` and (2) the `id` of the album the user wants to delete.
- Next, create a new variable called `updatedUser`. Do not initialize it (give it a value) yet...
- Now, you should use what we have learned about Mongoose's `findByIdAndUpdate` method to try to remove **only** the selected album from the user's MongoDB document. 
    - Make sure that, if this works, the **new** version of the user (minus one album) becomes the value of `updatedUser`.
    - If there is an error, you can, as usual, `catch` it and pass a new error object to the error handling middleware.
- **Some hints about how to remove one album:**
    - Remember how when we wanted to **add** an album using `findByIdAndUpdate`, we used the `$push` operator? There is another operator called `$pull` which may help!
    - However, after writing `$pull`, we do **not** want to find an album **object** equal to the `id` received from the frontend. Instead, we want to find an album object with an **`_id` key** equal to the `id` received from the frontend.
    - See if you can use what you already know about writing MongoDB query syntax to achieve this. If you are stuck, you can also use Google to research how to remove an **object** from an array using Mongoose and the `$pull` operator!
    - If you are still stuck after a while, we can also chat in a breakout room. :-)
- After you have successfully removed the album, you should send back **only** the user's updated `albums` array in the response to the frontend.
- Back in `/views/Albums.js` in the **frontend**, if the response received back from the server is successful ("ok") you should update the `albums` state variable with the parsed response.
- If the response received back from the server is not successful, you should handle this in the usual way (by showing an alert containing the error message received from the server).
    - **Hint** - You can check your other `Albums.js` functions for how to do this if you have forgotten. ;-)
- Finally, test your changes by creating and deleting different albums, and making sure you always get the result you expect. Fix any bugs you find.
    - **Hint:** Remember: both your browser console and VS Code terminals can help you identify any bugs in your code.
  
# Task 7

Let's prepare our project, so that soon we will be able to delete individual albums.

- You should start in `/views/Albums.js` in your **`frontend`** repo. When a user clicks the "X" next to an album, you should already be calling the `deleteOneAlbum` function and making a log of the album's `id`.
- Now update this function to send a DELETE HTTP request to your server, to the URL `http://localhost:3001/users/[user's id]/albums/[album's id]`. You should replace `[user's id]` and `[album's id]` with the correct variables, using template literals (e.g. `${aVariable}`). 
    - When creating your `fetch` request, the `settings` object only needs a `method` property, with the value "DELETE". You will not send any data in your request.
    - Also remember to use your `REACT_APP_SERVER_URL` environment variable instead of `http://localhost:3001`!
- Now go to your **`backend`** repo. Add an extra `delete` **route** to your `/routes/users.js` router which will receive the request from the frontend to delete one album.
    - Remember that the path will have two **parameters** (:) - one for the user's id, and one for the id of the album they want to delete.
- The request will be forwarded on to a **new** controller function in `/controllers/usersController.js` called `deleteAlbum`. Create this function (and remember to `export` it so you can `import` and use it in your router!)
    - For now, the function should simply `console.log`(1) the user's id and (2) the album id using the **parameters** of the request object. 
    - You should also send a response back to the frontend containing the string "Album deleted!".
- Finally, go back to `/views/Albums.js` in your **`frontend`** repo. Now you will need to handle the response from the server:
    - If the response you receive back from the server is successful ("ok"), you can make an `alert` containing the parsed response ("Album deleted!").
    - If the response received back from the server is not successful, you can make an `alert` containing the string "Unsuccessful request!".
- Now test your new functionality by creating two new albums album, clicking the "X" next to one of them, and seeing what happens! Fix any bugs you find.
    - **Hint:** Remember: both your browser console and VS Code terminals can help you identify any bugs in your code.

# Task 6

Let's practice using `findByIdAndUpdate` once more, by refactoring our final controller function - the one which deletes all the logged-in user's albums when they click the "Delete all albums!" button in the browser.

- You shouldn't need to change any of your frontend code.
- In the backend, you should go to the `deleteAlbums` controller function in `/controllers/usersController.js`.
- Refactor the function so you are using your `User` model to update the `users` collection of the MongoDB database `albums-project`. There should be no more lowdb code in your controller function.
    - **Hint:** You no longer need to find the index of the user before updating their `albums` array. You only need to know the user's `id` - the clue is in the name `findByIdAndUpdate`!
    - Make sure to return the correct data back to the frontend in your response (note what you are currently sending back after updating `db.json`).
    - Also remember to use `http-errors` to handle any errors in your controller function.
- When you are done, make sure to test your new function by creating some new albums in the browser, and trying to delete them.
- If this is all working, you can now delete any remaining lowdb code from your controller functions! You can also delete the `/data` directory, as we are now only using MongoDB as our database solution. :-)
- Finally, let's update our `backend` repo's dependencies by using `npm uninstall` to uninstall `lowdb` and `uuid`.

# Task 5

Now you should try to use your `User` model, and Mongoose's `findByIdAndUpdate` method, to make the `postAlbum` controller function work with your MongoDB database instead of `db.json`:

- You can find the controller function in `/controllers/usersController.js`.
- When you are done, you should be able to create new albums for the logged in user by clicking the "Submit Album" button in your browser.
- Remember that the new albums should be created in the `users` collection of the MongoDB database `albums-project`. There should be no more lowdb code in your controller function!
- Don't forget to also use `http-errors` for your error handling.
- When you are done, make sure to also test to make sure your error handling is working correctly!

- Make sure to use the correct HTTP method when making your fetch request. You should also update your backend endpoints
  
  
# Task 4

Let's update our error handling to use the new `http-errors` module. 

**Remember**: so far we have updated:

- The `registerPost()` controller function in `/controllers/registerController.js` (handle a HTTP request sent by a user who is trying to register)
- The `loginPost()` controller function in `/controllers/loginController.js` (handle a HTTP request sent by a user who is trying to log in)
- The `getUserData()` controller function in `/controllers/usersController.js` (handle a HTTP request sent when Albums.js first renders to GET the current user's first name and list of albums)

1. Use npm to install the `http-errors` module.
2. Change your error handling in all your updated controller functions to use the `http-errors` module.
    - I showed you two ways you can do this - feel free to choose your favourite!
    - If you need to research anything (e.g. different "named" errors), you can check out the `http-errors` docs at https://www.npmjs.com/package/http-errors 
    - When you are done, you can test your new error handling by:
        - Trying to register but leaving one or more inputs blank
        - Trying to log in as an unregistered user
    - If you have some time at the end, you can comment out your new error handling and practice the other way of using `http-errors` that I showed you. When you are done, feel free to go back to the way you prefer. :-)



# Task 3

Now you can register a new user successfully, you should now refactor your code to make sure an existing user can **log in** successfully.

- You can start in `/views/Login.js` (**frontend**) to follow the process for logging in.
- When refactoring your **backend** controller function to handle logging in, remember that we are now using MongoDB and Mongoose to handle your data, not `/data/db.json` and lowdb.
    - In your controller function, also remember to add error handling whenever you use Mongoose to query your MongoDB collection.
- When you are done, use your browser to log in (1) as an existing user and (2) a user who doesn't exist. Make sure you get the expected outcome in both cases.
- 
# Task 2

Now your User model is working when you send requests using Postman, make sure you can also log in using your **React frontend**.

Remember, to register using your frontend, you need to complete the React form and click "Register an account". Once the button has been clicked, there are **2 stages**:

- **Stage 1**: in `/views/Register.js` (**frontend**), send a HTTP POST request to your server's "/register" path. The `registerPost` controller function for this endpoint (**backend**) should create a new user document in your database and send back a 201 response containing a copy of the new document. **If you completed yesterday's task, this should already work!**
    - You can check this by registering a new user in your browser. Even though you will get an error message, if you check you MongoDB shell / Compass, you will see the user was created. :-)
    - Note that in the `registerPost` controller function (**backend**), when the 201 response is sent you include a copy of the **whole** new document (username, password etc...). 
    - But also note that in `/views/Register.js` (**frontend**), you **only** use the user's unique id from the response. The rest of the data is not needed!
        - Change `/controllers/registerController.js` (**backend**) to send back **only** a unique "id" for the user.
        - Be careful with what you are sending back here! Check out your new document in the MongoDB Shell / Compass if you are unsure...
        - Also make sure in `/views/Register.js` (**frontend**) that you are using **exactly** what you receive in the server response to set the `currentUserId` state variable in `App.js`!

- **Stage 2**: Next, the `Albums` view will be rendered in the browser. As soon as the view is rendered, a `useEffect` will be called to your server's GET /user endpoint to retrieve the necessary details about the user who just registered.
    - You do not need to change the `useEffect` in `/views/Albums.js` (**frontend**). Instead, refactor ("rewrite") your **backend** code to make sure the `fetch` request in the `useEffect` is successful.
    - Remember: your data now lives in MongoDB, not `db.json`!
    - In the controller function (**backend**) for the GET /user route, try to research and implement the new Mongoose method **Model.findById()** to find the correct user document using its id.
    - You can tell if your changes have worked because you will see "Welcome [user's firstname]!" in the top-left corner of the `Albums` view.
    - Make sure you are still also sending back the user's `albums` array from the backend, even though a newly registered user will not have any albums at the moment.
    - Finally, make sure to add error handling (like yesterday) whenever you use Mongoose to query your MongoDB collection.
  
Live Session - 31/05/22