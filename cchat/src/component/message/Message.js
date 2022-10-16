import React from 'react'
import './message.css'

const Message = ({ user, message, classs }) => {

    if (user) {
        return (
            <div className={`message_box ${classs}`}>
                {`${user} : ${message}`}
            </div>
        )
    } else {
        return (
            <div className={`message_box ${classs}`}>
                {`You : ${message}`}
            </div>
        )
    }


}

export default Message