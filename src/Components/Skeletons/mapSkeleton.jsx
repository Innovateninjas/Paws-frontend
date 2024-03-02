import React from "react"
import ContentLoader from "react-content-loader"

const MapSkeleton = (props) => (
    <ContentLoader
        speed={3}
        width="100%"
        height={153.3}
        backgroundColor="#daebc8"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="20" ry="20" width="100%" height="135.3" />
    </ContentLoader>
)

export default MapSkeleton;

