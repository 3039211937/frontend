import React, { useContext } from 'react'
import { ContactListContext } from '../../Context/ContactListContext'
import './MessageFormStyles.css'
import { IoAddSharp } from "react-icons/io5";


const NewMessageForm = (props) => {
    console.log(useContext(ContactListContext))
    const handleSubmit = (event) =>{
        event.preventDefault()
        const form = event.target
        const message_value = form.mensaje.value

        props.onCreateNewMessage(
            message_value
        )
    }

    return (
        <form onSubmit={handleSubmit} className='message-form'>
            <textarea id='mensaje' name='mensaje' placeholder='Escribe tu mensaje aquí' className='message-form-text-input'  />
            <button><img src="https://cdn-icons-png.freepik.com/256/10924/10924424.png?semt=ais_white_label" className='message-form__img'></img></button>
        </form>

    )
}

export default NewMessageForm