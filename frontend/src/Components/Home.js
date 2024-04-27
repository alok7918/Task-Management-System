import three from "../Asset/three.jpg";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import { useState } from "react";

const Home = () => {
  // State to manage the visibility of the sign-up and login popups
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // Function to open the sign-up popup
  const openPopup = () => {
    setIsOpen(true);
  };

  // Function to open the login popup
  const openPop = () => {
    setOpen(true);
  };

  // Function to close the sign-up popup
  const closePopup = () => {
    setIsOpen(false);
  };

  // Function to close the login popup
  const closePop = () => {
    setOpen(false);
  };

  return (
    <>
      <div style={{ display: "flex", marginLeft: "1000px" }}>
        <div style={{ marginTop: "-50px" }}>
          <button onClick={openPopup} className="sbutton">
            Sign up
          </button>
          {isOpen && (
            <div className="popup-container">
              <div className="popup-box">
                <span className="close1" onClick={closePopup}>
                  close
                </span>
              
                <Register />
            
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: "-50px" }}>
          <button onClick={openPop} className="s1button">
            Login
          </button>
          {open && (
            <div className="popup-container">
              <div className="popup-box">
                <span className="close" onClick={closePop}>
                  close
                </span>
                <Login />
              </div>
            </div>
          )}
        </div>
      </div>

      <nav>
        <img width="100%" src={three} />
      </nav>

      <Footer />
    </>
  );
};

export default Home;
