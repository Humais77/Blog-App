import { Button, Label, TextInput, Card, Alert, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sigInStart,sigInSuccess,signInFailure } from "../redux/user/userSlice";
import { useDispatch,useSelector } from "react-redux";
const Signin = () => {
  const [formData,setFormData] = useState({});
  const {loading,error} = useSelector((state=>state.user));
  const dispatch = useDispatch();
  const naviage = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill in all fields."));
    }
    try {
      dispatch(sigInStart());
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'},
          body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(sigInSuccess(data));
        naviage('/');
      }
    } catch (error) {
      dispatch(signInFailure("Something went wrong. Please try again."));
      
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <div className="text-center">
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg"
          >
            Blog-App
          </Link>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Enter your username and password to Login
          </p>
        </div>

        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput id="email" type="email" placeholder="name@example.com"  onChange={handleChange}/>
          </div>
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput id="password" type="password" placeholder="••••••••"  onChange={handleChange}/>
          </div>
          <Button
            
            type="submit"
            className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
          disabled={loading}>
            {loading ?(
              <>
              <Spinner size="sm"/>
              <span>Loading...</span>
              </>
            ):"Sign in"}
          </Button>
        </form>

        <div className="flex justify-center gap-1 mt-5 text-sm">
          <span className="text-gray-600 dark:text-gray-300">Don't have an account?</span>
          <Link to="/sign-up" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </Card>
    </div>
  );
};

export default Signin;
