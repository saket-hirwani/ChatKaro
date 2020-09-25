import React from 'react';
import "./Login.css";
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import firebase from 'firebase';

function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn =() =>{
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        auth.signInWithPopup(provider).then(result =>
            {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            }
            ).catch(
                (e)=>alert(e.message)
            );
    }
    return (
        <div className="login">
        <div className="login_container">
        <img
        src="https://lh3.googleusercontent.com/proxy/Ys-BHBi_YvuPuex3boreTWWUVulxXbPgYCxewFO8QdkwzqNzDIDp-eQVcSLND9jKpjgZBORo7xQxaZQC4A"
        alt="logo"/>
        <div className="login_text">
        <h1>Sign in to ChatKaro</h1></div>
        <Button onClick={signIn}>
        Sign in with Google
        </Button>
        </div>
        </div>
    )
}

export default Login
