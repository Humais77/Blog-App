import { Button, Label, TextInput, Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
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

        <form className="flex flex-col gap-4 mt-6">
          <div>
            <Label htmlFor="username" value="Username" />
            <TextInput id="username" type="text" placeholder="Enter username" required />
          </div>
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput id="email" type="email" placeholder="name@example.com" required />
          </div>
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput id="password" type="password" placeholder="••••••••" required />
          </div>
          <Button
            
            type="submit"
            className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Sign Up
          </Button>
        </form>

        <div className="flex justify-center gap-1 mt-5 text-sm">
          <span className="text-gray-600 dark:text-gray-300">Already have an account?</span>
          <Link to="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
