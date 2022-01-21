import React from 'react'
import FbImageGrid from 'react-fb-image-grid';

export default function Image({ src }) {
    const images = [src]
    if (src !== "") {
        return (
            <div>
                <FbImageGrid images={images} />
            </div>
        )
    } else {
        return null
    }
}
