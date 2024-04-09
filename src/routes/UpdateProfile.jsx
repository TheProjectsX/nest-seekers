import { useContext } from "react";
import UserDataContext from "../context/context";
import { updateProfile } from "firebase/auth";

// React Toast
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const context = useContext(UserDataContext);
  const { userAuthData, setUserAuthData, forceUpdate } = context;

  // Handle Update
  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const fullName = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;

    if (
      fullName == userAuthData.displayName &&
      (photoUrl === userAuthData.photoURL ||
        (photoUrl === "" &&
          userAuthData.photoURL ===
            "https://i.ibb.co/c10qCXL/dummy-profile-picture.jpg"))
    ) {
      toast.warning("You must Change some info First!");
      e.target.submit.classList.add("animate__shakeX");
      setTimeout(() => {
        e.target.submit.classList.remove("animate__shakeX");
      }, 3000);
      return;
    }

    updateProfile(userAuthData, {
      displayName: fullName,
      photoURL:
        photoUrl !== ""
          ? photoUrl
          : "https://i.ibb.co/c10qCXL/dummy-profile-picture.jpg",
    })
      .then(() => {
        setUserAuthData(userAuthData);
        forceUpdate();
        toast.success("Profile Updated Successfully!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3 className="font-bold text-2xl mb-10 p-3 text-center font-lato bg-blue-700 text-white rounded-lg">
        Update Profile Informations
      </h3>
      <div className="flex flex-col items-center gap-5">
        <img
          src={userAuthData.photoURL}
          alt={userAuthData.displayName}
          className="w-52 rounded-full"
        />
        <form
          className="space-y-4 md:space-y-6 container max-w-96"
          onSubmit={handleUpdateProfile}
        >
          <label className="block text-sm font-medium text-white">
            Your Name:
            <input
              type="text"
              name="name"
              className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              defaultValue={userAuthData.displayName}
            />
          </label>
          <label className="block text-sm font-medium text-white">
            Your Photo URL:
            <input
              type="text"
              name="photoUrl"
              className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              defaultValue={
                userAuthData.photoURL ===
                "https://i.ibb.co/c10qCXL/dummy-profile-picture.jpg"
                  ? ""
                  : userAuthData.photoURL
              }
            />
          </label>

          <button
            type="submit"
            name="submit"
            className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center animate__animated"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
