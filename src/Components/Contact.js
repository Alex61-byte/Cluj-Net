import React from 'react'
import { FiUser } from 'react-icons/fi'
import { Link, Navigate } from 'react-router-dom'

const Contact = ({ email, image, name, id }) => {
    return (
        <Link className="contact-link" to={`/UserProfile/${id}`} replace>
            <div className="contact">
                <div className="contact-image-container">
                    {image !== null ? <img src={image} alt={name} width="100%" /> : <FiUser style={{ fontSize: "2em", transform: 'translate(0,30%)' }} />}
                </div>
                {name}
            </div>
        </Link>
    )
}

export default Contact
