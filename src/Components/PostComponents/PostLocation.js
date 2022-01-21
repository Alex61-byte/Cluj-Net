import React, { useEffect } from 'react'
import { ImLocation } from 'react-icons/im'
export default function PostLocation({ location, setShowLocation, src, showLocation }) {
    useEffect(() => {
        if ((src === undefined || src === "") && showLocation === (false)) {
            setShowLocation(true)
        }
    })
    if (location !== "") {
        if (setShowLocation) {
            return (
                <div className="post-location">
                    <p onMouseEnter={(e) => setShowLocation(true)} onMouseLeave={(e) => setShowLocation(false)} className="show-location"> <ImLocation />is at {location}</p>
                </div>
            )
        } else {
            return (
                <div className="post-location">
                    <p><ImLocation />is at {location}</p>
                </div>
            )
        }
    } else {
        return null
    }
}
