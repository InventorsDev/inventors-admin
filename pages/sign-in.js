import React, { useState } from "react";

export default function SignIn() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const carouselItems = [
    {
      title: "Create a Professional Profile",
      description:
        "Donec justo tortor, malesuada vitae faucibus ac, tristique sit amet massa. Aliquam dignissim nec felis quis imperdiet.",
      imageUrl: "/images/padlock.png",
    },
    {
      title: "Explore Opportunities",
      description:
        "Suspendisse fermentum, lectus a ultrices sagittis, nisi ligula convallis eros, et efficitur metus nisi et felis.",
      imageUrl: "/images/padlock.png",
    },
    {
      title: "Build Your Network",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      imageUrl: "/images/padlock.png",
    },
  ];

  const goToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex =
      currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setError("");
    console.log("Signing in:", email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-teal-500">
      <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-4xl flex">
        <div className="w-1/2 p-10 relative">
          <img
            src="/images/logo-dark.png"
            alt="Inventors Logo"
            className=" h-8 pb-2"
          />

          <h2 className="text-2xl font-bold my-4">Let's get you signed in</h2>
          <form className="space-y-4" onSubmit={handleSignIn}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label className="block text-sm font-medium" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="lead@inventors.com"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
              />
              <p className="mt-1 text-sm text-teal-600 hover:underline cursor-pointer">
                Forgot Password?
              </p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-teal-600"
                style={{ accentColor: "#38b2ac" }}
                id="keep-logged-in"
              />
              <label htmlFor="keep-logged-in" className="ml-2 text-sm">
                Keep me logged in
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-sm">
            Don't have an account yet?{" "}
            <a href="#" className="text-teal-600 hover:underline">
              Become a 'Lead'
            </a>
          </p>
          <div className="mt-4 flex items-center">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <span className="text-sm text-gray-500">Or sign in with email</span>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div>
          <button className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100 transition duration-200">
            <img
              src="/images/google-icon.png"
              alt="Google Icon"
              className="h-5 w-5"
            />
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="w-1/2 p-10 bg-gray-50 flex flex-col justify-center items-center relative">
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={goToPrevious}
              className="text-gray-600 hover:text-teal-600 focus:outline-none"
              aria-label="Previous"
            >
              &lt;
            </button>
            <button
              onClick={goToNext}
              className="text-gray-600 hover:text-teal-600 focus:outline-none"
              aria-label="Next"
            >
              &gt;
            </button>
          </div>
          <img
            src={carouselItems[currentIndex].imageUrl}
            alt={carouselItems[currentIndex].title}
            className="h-32 w-32 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">
            {carouselItems[currentIndex].title}
          </h3>
          <p className="text-gray-600 text-center">
            {carouselItems[currentIndex].description}
          </p>
          <div className="mt-4 flex space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? "bg-teal-600" : "bg-gray-400"
                }`}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
