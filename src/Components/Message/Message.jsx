import "./message_styles.css";

function Message(propiedades) {

    return (
        <div className={"message-container " + (propiedades.author === 'YO' ? 'message-container--right' : 'message-container--left')}>
            <div className="message" >
                <p>{propiedades.content}</p>
                <span className="message-time">{propiedades.timestamp}</span>
            </div>
        </div>
    )
}

export default Message