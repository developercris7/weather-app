import React, { useContext } from "react";
import "../styles/navbar.css";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { DataContext } from "../contextAPI/Context";

const Navbar = () => {
  const { showProfileInfo, setShowProfileInfo, user, handleLogout } =
    useContext(DataContext);
  return (
    <header>
      <div className="nav-brand">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3845/3845731.png"
          alt="weather-icon"
          className="nav-logo"
        />
        <h2>Weather App </h2>
      </div>

      <div className="profile-container">
        <img
          src="https://cdn-icons-png.flaticon.com/128/236/236832.png"
          alt="profile-pic"
          className="profile-pic"
          onClick={() => setShowProfileInfo(!showProfileInfo)}
        />

        {showProfileInfo && (
          <div className="profile-info-container">
            <IoMdClose
              className="close-btn"
              onClick={() => setShowProfileInfo(false)}
            />

            <div className="profile-info">
              <FaUser />
              <span>{user && user.name}</span>
            </div>
            <div className="profile-info">
              <MdEmail />
              <span>{user && user.email}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
