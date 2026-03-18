import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import { IoArrowBack } from "react-icons/io5";
import supportIcon from "../../assets/support-icon.png"; // ✅ adjust path if needed

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
          src={supportIcon} // ✅ local asset
          className="sidebar-container__img"
          alt="support"
        />
      </div>
    </div>
  );
};

export default SideBar;
