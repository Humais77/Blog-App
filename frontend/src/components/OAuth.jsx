import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { sigInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch()
    const naviage = useNavigate();
    const handleGoogleClick = async()=>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});
        try {
            const resultFromGoogle = await signInWithPopup(auth,provider);
            const res = await fetch('/api/auth/google',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:resultFromGoogle.user.displayName,
                    email:resultFromGoogle.user.email,
                    googlePhotoUrl:resultFromGoogle.user.photoURL,
                }),
            })
            const data = await res.json();
            if(res.ok){
                dispatch(sigInSuccess(data));
                naviage('/');
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <Button type='button' className=' bg-gradient-to-r from-red-400 to-red-500
    hover:from-red-500 hover:to-red-600
    text-white font-semibold
    px-6 py-2
    rounded-full
    shadow-md 
    transition-all duration-300 ease-in-out
    ' onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-1 '/>
        Continue with Google
    </Button>
  )
}

export default OAuth