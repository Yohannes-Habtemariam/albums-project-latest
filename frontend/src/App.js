import React, { useState } from "react";
import Register from "./views/Register";
import Login from "./views/Login";
import Albums from "./views/Albums";
import "./App.css";

const App = () => {
    // When the app first renders, no user is logged in
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentUserId, setCurrentUserId ] = useState("");
    const [ showLogin, setShowLogin ] = useState(true);

    // To sign out from your account
    const logout = () => {
        setCurrentUserId("");
        setIsLoggedIn(false);
        setShowLogin(true);
    }

    // to delete user account
    const deregister = async () => {
        const settings = {
            method: "DELETE"
        }

        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${currentUserId}`, settings);

        const data = await response.json();

        try{
            if(response.ok){
                alert(data.message);
                setIsLoggedIn(false); 
                setShowLogin(true)
                setCurrentUserId("");
                
            } else{
                throw new Error(data.message)
            }
        }catch (err) {
            alert(err.message)
        }
    }

    // If no user is currently logged in
    if (!isLoggedIn) {
        // Display the login view
        if (showLogin) {
            return <Login 
                setShowLogin={setShowLogin} 
                setIsLoggedIn={setIsLoggedIn} 
                setCurrentUserId={setCurrentUserId} 
            />
        // Display the register view
        } else {
            return <Register 
                setShowLogin={setShowLogin} 
                setIsLoggedIn={setIsLoggedIn} 
                setCurrentUserId={setCurrentUserId} 
                //deregister={deregister}
            />
        }
    // Else, if a user is logged in, display the "albums" page for that user
    } else {
        return <Albums 
            currentUserId={currentUserId} 
            logout={logout}
            deregister={deregister}
        />
    }
}

export default App;