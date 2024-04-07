import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import UserDataContext from "./context/context";
import { useState } from "react";

function App() {
  const [userAuthData, setUserAuthData] = useState(null);

  return (
    <div className="max-w-[1100px] mx-auto font-ubuntu" data-theme="night">
      <UserDataContext.Provider value={{ userAuthData, setUserAuthData }}>
        <div className="px-5 mb-10">
          <Navbar />
          <Outlet />
        </div>
        <Footer />
      </UserDataContext.Provider>
    </div>
  );
}

export default App;
