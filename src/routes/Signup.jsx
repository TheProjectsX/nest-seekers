import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

// React Toast
import { toast } from "react-toastify";

// Firebase Auth Provider
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import auth from "../firebase/config";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const passwordVerifyPattern = /(?=.*[A-Z])(?=.*[a-z]).{6,}/;

  // Sign up using Google
  const handleGoogleSignUp = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error));
  };

  // Sign up using GitHub
  const handleGitHubSignUp = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error));
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    if (!passwordVerifyPattern.test(password)) {
      e.target.password.style.borderColor = "red";
      toast.error(
        "Password must Contain at least an UpperCase and LowerCase Character",
        { autoClose: 5000 }
      );
      e.target.submit.classList.add("animate__shakeX");
      setTimeout(() => {
        e.target.submit.classList.remove("animate__shakeX");
      }, 3000);
      return;
    }

    const fullName = e.target.name.value;
    const email = e.target.email.value;
    const photoUrl = e.target.photoUrl.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Sign Up Successful!");
        updateProfile(result.user, {
          displayName: fullName,
          photoURL:
            photoUrl !== "" ? photoUrl : "/images/dummy-profile-picture.jpg",
        })
          .then(() => console.log("Profile Updated!"))
          .catch((err) => console.log(err));
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <h3 className="flex items-center mb-6 text-2xl font-semibold text-white font-lato">
          Hello There!
        </h3>
        <div className="rounded-lg shadow dark:border md:mt-0 w-full sm:w-fit xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white text-center underline underline-offset-8">
              Create a New Account
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="px-6 py-2.5 flex justify-center items-center gap-2 border border-[#4b5563] rounded-lg hover:bg-[#374151] hover:text-gray-200"
                onClick={handleGoogleSignUp}
              >
                <FcGoogle className="text-xl" />
                Sign Up with Google
              </button>
              <button
                className="px-6 py-2.5 flex justify-center items-center gap-2 border border-[#4b5563] rounded-lg hover:bg-[#374151] hover:text-gray-200"
                onClick={handleGitHubSignUp}
              >
                <FaGithub className="text-xl text-white" />
                Sign Up with GitHub
              </button>
            </div>
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">Or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
              <div>
                <label className="block text-sm font-medium text-white">
                  Your Full Name <span className="text-red-600">*</span>
                  <input
                    type="text"
                    name="name"
                    className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mr XYZ"
                    required={true}
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Your Email <span className="text-red-600">*</span>
                  <input
                    type="email"
                    name="email"
                    className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    required={true}
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Your Photo URL
                  <input
                    type="text"
                    name="photoUrl"
                    className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/...."
                    required={false}
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-white relative">
                  Password <span className="text-red-600">*</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={showPassword ? "123456" : "••••••"}
                    minLength={6}
                    className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required={true}
                    onChange={(e) =>
                      (e.target.style.borderColor = "rgb(75 85 99)")
                    }
                  />
                  <div
                    className="absolute right-1 top-8 text-xl p-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="ml-3 text-sm">
                  <label className="text-gray-300 items-center flex gap-2">
                    <input
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-[#2563eb] ring-offset-gray-800"
                      required={false}
                    />
                    Remember me
                  </label>
                </div>
              </div>
              <button
                type="submit"
                name="submit"
                className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center animate__animated"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-400">
                Already have an Account?{" "}
                <Link
                  to="/login"
                  className="font-medium hover:underline text-[#3b82f6] pl-4"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
