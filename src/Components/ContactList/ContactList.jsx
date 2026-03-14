import React, { useContext } from 'react'
import { Link } from 'react-router'
import { ContactListContext } from '../../Context/ContactListContext'
import './Contact-styles.css'


const ContactList = () => {
    const { contactList, isContactListLoading } = useContext(ContactListContext)

    return (
        <div>
            {
                isContactListLoading
                    ? <span>Cargando</span>
                    : contactList.map(
                        (contact) => {
                            return <ContactItem
                                contact={contact}
                                key={contact.id}
                            />
                        }
                    )
            }

        </div>
    )
}



const ContactItem = (props) => {
    const contact = props.contact
    return (
        <Link to={'/contacto/' + contact.id} >
            <div className='contact-item'>
            <img src={contact.profile_img} className='contact-item__img'/>
            <h2 className='contact-item__name'>{contact.name}</h2>
            </div>
        </Link>
    )
}

export default ContactList