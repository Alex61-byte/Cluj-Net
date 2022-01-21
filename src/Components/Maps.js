import React, { useEffect } from 'react'

import tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

export default function Maps({ usersPlace, src }) {



    if (usersPlace !== "" && src === "") {
        return (
            <div className="map-container">
                <iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBUzYDHUwbOcWeXObJ4KYRZMAQLZG3zpVU&q=${usersPlace}`} frameBorder="0" title="gmap" width="100%" height="200" loading="lazy" allowFullScreen></iframe>
            </div>
        )
    } else if (usersPlace !== "" && (src !== "" && src !== null)) {
        return <div className="map-container">
            <div className="post-hidden-map">
                <iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBUzYDHUwbOcWeXObJ4KYRZMAQLZG3zpVU&q=${usersPlace}`} frameBorder="0" title="gmap" width="100%" height="200" loading="lazy" allowFullScreen></iframe>
            </div>
        </div>

    } else if (usersPlace !== "" && src === null) {
        return <div className="map-container">
            <iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBUzYDHUwbOcWeXObJ4KYRZMAQLZG3zpVU&q=${usersPlace}`} frameBorder="0" title="gmap" width="100%" height="200" loading="lazy" allowFullScreen></iframe>
        </div>
    } else {
        return null
    }

}
