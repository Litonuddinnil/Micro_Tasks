import  { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
const auth = getAuth(app);
export const AuthContext = createContext(null);
const AuthProvider = ({children}) => { 
    const provider = new GoogleAuthProvider();
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const createUser  = (email,password)=>{
        setLoading(true);
     return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInUser  = (email,password)=>{
        setLoading(true);
     return signInWithEmailAndPassword(auth,email,password);
    }
    const googleLogIn = () =>{
        setLoading(true);
        return signInWithPopup(auth,provider);
    }

    const logOut  = ()=>{
        setLoading(true);
        return signOut(auth)
    }
    const userUpdateProfile = (name,photo)=>{
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          });
    }
    useEffect(()=>{
       const unSubscribe =  onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser); 
        })
        return ()=>{
            return unSubscribe();
        }
    },[])
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        logOut,
        userUpdateProfile,
        googleLogIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;