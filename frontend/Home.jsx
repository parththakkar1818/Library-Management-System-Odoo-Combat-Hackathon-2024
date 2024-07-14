import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Home = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  // Handler for after signup to add user data to MongoDB
  const handleSignUp = async (event) => {
    alert("hi");
    console.log(user);
    if (isSignedIn && user) {
      const payload = {
        user_id: user.id,
        name: user.fullName || "",
        mobile_number: user.phoneNumber || "",
        current_books: [], // Initialize empty list for current books
        past_books: [], // Initialize empty list for past books
        is_librarian: 0, // Default to 0 for non-librarians
      };
      console.log("Home line 26",payload);

      try {
        const response = await fetch(
          "http://localhost:8000/add_user_admin_info/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add user admin info");
        }
        console.log("User admin info added successfully");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  React.useEffect(() => {
    handleSignUp();
  }, [isSignedIn, user]);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <div className="flex w-full max-w-6xl px-8 py-16 mx-auto">
        <div className="w-full md:w-1/2 pr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4 hover:underline transition duration-300">
            Sell your E-waste with E-CycleHub
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-blue-600 hover:underline transition duration-300">
            Your E-Waste, Our Responsibility
          </h2>
        </div>
        <div className="w-full m-5 md:w-1/2 flex items-center justify-end">
          <div className="w-full bg-white p-14 rounded-lg shadow-xl">
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
                  forceRedirectUrl="/allbooks"
                  className="bg-blue-600 text-white px-4 py-2 mx-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                />
                <SignUpButton
                  forceRedirectUrl="/allbooks"
                  className="bg-blue-600 text-white px-4 py-2 mx-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <img src={Logo}/> */}
    </div>
  );
};

export default Home;
