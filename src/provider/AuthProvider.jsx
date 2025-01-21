import  { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';
const auth = getAuth(app);
export const AuthContext = createContext(null);
const AuthProvider = ({children}) => { 
    const provider = new GoogleAuthProvider();
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
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
            if(currentUser){
                //get token and store client 
                console.log(currentUser.email);
                const userInfo = {email :currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token);
                        setLoading(false);
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        })
        return ()=>{
            return unSubscribe();
        }
    },[axiosPublic])
    const authInfo = {
        user,
        loading,
        setLoading,
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