import React from 'react'
import ContentLoader from 'react-content-loader'

const DashboardSkeleton = props => (
    <ContentLoader
        speed={3}
        opacity={0.1}
        height={280}
        width="100%"
        backgroundColor="#b8b5b5;" // Set background color
        foregroundColor="#ffffff" // Set foreground color to white for better contrast
        {...props}
    >
        <rect x="43" y="3" rx="15" ry="15" width="305" height="180" /> {/* Adjust x position */}
        <rect x="43" y="190" rx="10" ry="10" width="200" height="20" /> {/* Adjust x position */}
        <rect x="43" y="215" rx="10" ry="10" width="249" height="20" /> {/* Adjust x position */}
        <rect x="43" y="242" rx="10" ry="10" width="284" height="20" /> {/* Adjust x position */}
    </ContentLoader>
)

export default DashboardSkeleton;
