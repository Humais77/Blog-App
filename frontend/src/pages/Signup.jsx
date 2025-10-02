import { Button, Label, TextInput, Card, Alert, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useSelector } from "react-redux";

const Signup = () => {
  const {currentUser} = useSelector((state=>state.user));
  const [formData,setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const naviage = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setError("Please fill out all fields.");
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'},
          body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        return setError(data.message);
      }
      setLoading(false);
      if(res.ok){
        naviage('/sign-in');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      
    }
  }
  useEffect(()=>{
      if(currentUser){
        naviage('/');
      }
    },[currentUser,naviage]);
  
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
            Create an account to get started 
          </p>
        </div>

        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username" value="Username" />
            <TextInput id="username" type="text" placeholder="Enter username"  onChange={handleChange} />
          </div>
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
            ):"Sign up"}
          </Button>
          <OAuth/>
        </form>

        <div className="flex justify-center gap-1 mt-5 text-sm">
          <span className="text-gray-600 dark:text-gray-300">Already have an account?</span>
          <Link to="/sign-in" className="text-blue-600 hover:underline">
            Sign In
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

export default Signup;
