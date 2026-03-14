import React from 'react'
import './SideBar.css'
import { BsChatSquareTextFill } from "react-icons/bs";
import { TbAtom2Filled } from "react-icons/tb";
import { RiChatVoiceLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

const SideBar = () => {
  return (
    <div className='sidebar-container'>
      <div className='sidebar-container__upper'>
        <button className='sidebar-container__icon'><BsChatSquareTextFill/></button>
        <button className='sidebar-container__icon'><TbAtom2Filled/></button>
        <button className='sidebar-container__icon'><RiChatVoiceLine/></button>
      </div>
      <div className='sidebar-container__bottom'>
        <button className='sidebar-container__icon'><IoSettingsOutline/></button>
        <img src='https://rtrsports.com/wp-content/uploads/2024/07/senna-1.jpg' className='sidebar-container__img'></img>
      </div>
    </div>
  )
}

export default SideBar
