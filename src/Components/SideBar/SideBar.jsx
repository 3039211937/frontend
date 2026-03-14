import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import { IoArrowBack } from "react-icons/io5";

const SideBar = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-container__upper">
        <button
          className="sidebar-container__icon"
          onClick={goHome}
          title="Volver al inicio"
        >
          <IoArrowBack />
        </button>
      </div>

      <div className="sidebar-container__bottom">
        <img
          src="https://rtrsports.com/wp-content/uploads/2024/07/senna-1.jpg"
          className="sidebar-container__img"
          alt="profile"
        />
      </div>
    </div>
  );
};

export default SideBar;
