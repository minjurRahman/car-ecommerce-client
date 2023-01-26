import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);



const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoding] = useState(true);

    //create user
    const createUser = (email, password) =>{
        setLoding(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //Login/signin 
    const login = (email, password) =>{
        setLoding(true)
        return signInWithEmailAndPassword(auth, email, password);
    }


    //Manage User /register user /SignUp User
    useEffect( () =>{
       const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser);
            setUser(currentUser);
            setLoding(false);
        })
        return () => {
            return unsubscribe();
        }
    } , [])

    //Sign in with google 
    const googleProvider = new GoogleAuthProvider()

    const googleSignIn = () =>{
        setLoding(true);
        return signInWithPopup(auth, googleProvider);
    }

    //Sign Out
    const logOut = () =>{
        localStorage.removeItem('car-service-token');
        return signOut(auth);
    }


    const authInfo = {
        user, 
        loading,
        createUser,
        login,
        googleSignIn,
        logOut,

      
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;