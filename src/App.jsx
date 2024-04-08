import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import UserDataContext from "./context/context";
import { useEffect, useState } from "react";

// React Toast
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Animate CSS
import "animate.css";

// Firebase Auth
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/config";

function App() {
  const [dataLoading, setDataLoading] = useState(true);
  const [userAuthData, setUserAuthData] = useState(null);

  // Auth Change Effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user === null || user?.photoURL !== null) {
        setDataLoading(false);
        setUserAuthData(user);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="max-w-[1100px] mx-auto font-ubuntu" data-theme="night">
        <UserDataContext.Provider
          value={{ userAuthData, setUserAuthData, dataLoading }}
        >
          <div className="px-5 mb-10">
            <Navbar />
            <Outlet />
          </div>
          <Footer />
        </UserDataContext.Provider>
      </div>
    </>
  );
}

export default App;
