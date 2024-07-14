import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineSearch } from "react-icons/md";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";


const Navbar = () => {
  const handleChange = () => {
    // Handle change logic here
  };
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <>
      <div className="flex flex-col justify-between items-center w-full py-3 px-3 2xl:py-4 sticky z-10 top-0 rounded-md bg-gray-100">
        <div className="flex gap-1 shadow-lg px-14 py-4 rounded-xl bg-gray-50">
          <Link
            to="/home"
            className="w-56 2xl:w-[400px] flex items-center py-2 px-3 rounded-full"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="w-56 2xl:w-[400px] flex items-center py-2 px-3 rounded-full"
          >
            About
          </Link>
          {isSignedIn ? (
            <div className="flex items-center justify-center space-x-4">
              <UserButton
                userProfileMode="navigation"
                className="w-20 h-20 text-7xl rounded-full overflow-hidden border-2 border-blue-600"
              />
              <SignOutButton className="bg-blue-600 text-white px-4 py-2 mx-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300" />
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-2 m-2 px-[100px]">
              <SignInButton
                forceRedirectUrl="/"
                className="bg-blue-600 text-white px-4 py-2 mx-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              />
              <SignUpButton
                forceRedirectUrl="/"
                className="bg-blue-600 text-white px-4 py-2 mx-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              />
            </div>
          )}
        </div>
        <div className="flex items-center flex-1 ml-3 pb-1 pt-4 mt-10">
          <div className="w-[800px] flex items-center flex-1 py-3 px-3 gap-2 rounded-xl bg-white shadow-lg">
            <MdOutlineSearch className="text-gray-800 text-xl" />
            <input
              type="text"
              placeholder="search book..."
              className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
