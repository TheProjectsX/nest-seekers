import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import UserDataContext from "./context/context";
import { useEffect, useReducer, useState } from "react";

// React Toast
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Animate CSS
import "animate.css";

// Firebase Auth
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/config";

function App() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [dataLoading, setDataLoading] = useState(true);
  const [userAuthData, setUserAuthData] = useState(null);
  const [ordersData, setOrdersData] = useState(null);

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

  // Get Data from LocalStorage
  useEffect(() => {
    if (userAuthData) {
      const orders = JSON.parse(localStorage.getItem("orders")) ?? [];

      const userOrder = orders.find(
        (item) => item.email === userAuthData.email
      );

      if (userOrder) {
        setOrdersData(userOrder);
      } else {
        setOrdersData([]);
      }
    }
  }, [userAuthData]);

  // Update Order Data
  const updateOrderData = (id) => {
    const orders = JSON.parse(localStorage.getItem("orders")) ?? [];
    let userOrder = orders.find((item) => item.email === userAuthData.email);

    if (!userOrder) {
      orders.push({
        email: userAuthData.email,
        orders: [],
      });
    }

    orders.forEach((item) => {
      if (item.email === userAuthData.email) {
        item.orders.push(id);
      }
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    userOrder = orders.find((item) => item.email === userAuthData.email);
    if (userOrder) {
      setOrdersData(userOrder);
    } else {
      setOrdersData([]);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="max-w-[1100px] mx-auto font-ubuntu" data-theme="night">
        <UserDataContext.Provider
          value={{
            userAuthData,
            setUserAuthData,
            dataLoading,
            forceUpdate,
            ordersData,
            updateOrderData,
          }}
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
