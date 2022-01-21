import React from 'react'

export default function PostTitle({ title }) {
    if (title !== undefined || title !== "") {
        return (
            <div className="post-title">
                <h4>{title}</h4>
            </div>
        )
    } else {
        return null
    }
}
