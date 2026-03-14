import React from 'react'
import './MessageHeader.css'
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { SlOptionsVertical } from "react-icons/sl";
import { BsCameraVideo } from "react-icons/bs";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from 'react-router';
import MessagesList from '../MessagesList/MessagesList';



const MessageHeader = ({ author, avatar }) => {
  return (
    <div className='message-header-container'>
      <div className='message-header-container__left'>
        <Link className='message-header-container__icon-link' to={'/'}><TbArrowBackUp /></Link>
        <img 
          className='message-header-container__profile-img' 
          src={avatar} 
          alt={author} 
        />
        <h2 className='message-header-container__contact_name'>{author || 'Sin autor'}</h2>
      </div>
      <div className='message-header-container__right'>
        <button className='message-header-container__icon'><BsCameraVideo /></button>
        <button className='message-header-container__icon'><PiMagnifyingGlassLight /></button>
        <button className='message-header-container__icon'><SlOptionsVertical /></button>
      </div>
    </div>
  )
}

export default MessageHeader
