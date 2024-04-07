import { useContext } from "react";
import UserDataContext from "../context/context";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const context = useContext(UserDataContext);
  const { userAuthData } = context;

  const NavLinks = () => (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/about-us"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/update-profile"}>Update Profile</NavLink>
      </li>
    </>
  );

  const UserProfile = () => (
    <>
      {userAuthData ? (
        <>
          <button className="btn">Logout</button>
          <img
            src={userAuthData.photoURL}
            alt="Profile Picture"
            className="w-10 rounded-full border-2 border-gray-500 ml-3"
            title="Title"
          />
        </>
      ) : (
        <NavLink className="btn" to={"/login"}>
          Login
        </NavLink>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 mb-4 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <NavLinks />
          </ul>
        </div>
        <a className="btn btn-ghost font-lato text-2xl">Nest Seekers</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <NavLinks />
        </ul>
      </div>
      <div className="navbar-end">
        <UserProfile />
      </div>
    </div>
  );
};

export default Navbar;
