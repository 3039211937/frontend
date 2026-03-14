import { createContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { getContactById } from "../services/contactService";

export const ContactDetailContext = createContext(
    {
        isContactDetailLoading: false,
        contactDetailed: null,
        onCreateNewMessage: (new_message) => {}
    }
);

const ContactDetailContextProvider = (props) => {
    const [isContactDetailLoading, setIsContactDetailLoading] = useState(false)
    const [contactDetailed, setContactDetailed] = useState(null)

    const {id_contacto} = useParams()

    function loadContactById (contact_id){
        setIsContactDetailLoading(true)
        setTimeout(
            () => {
                const contact = getContactById(contact_id)
                setContactDetailed(contact)
                setIsContactDetailLoading(false)
            },
            500
        )
    }

    useEffect(
        () => {
            loadContactById(id_contacto)
        },
        [id_contacto]
    )

    const onCreateNewMessage = (new_message) => {
        const new_message_object = {
            content: new_message,
            author: 'YO',
            timestamp: '19:00',
            id: contactDetailed.messages.length + 1
        }
        const messages_cloned = [...contactDetailed.messages]
        messages_cloned.push(new_message_object)
        setContactDetailed({...contactDetailed, messages: messages_cloned})
    }

    return (
        <ContactDetailContext.Provider
            value={
                {
                    isContactDetailLoading: isContactDetailLoading,
                    contactDetailed: contactDetailed,
                    onCreateNewMessage: onCreateNewMessage
                }
            }
        >
            <Outlet/>
        </ContactDetailContext.Provider>
    )
}


export default ContactDetailContextProvider