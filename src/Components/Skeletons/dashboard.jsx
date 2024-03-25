import React from 'react'
import ContentLoader from 'react-content-loader'

const DashboardSkeleton = props => (
    <ContentLoader
        speed={3}
        opacity={0.1}
        height={300}
        width="100%"
        backgroundColor="#b8b5b5;" // Set background color
        foregroundColor="#ffffff" // Set foreground color to white for better contrast
        {...props}
    >
        <rect x="13" y="3" rx="15" ry="15" width="330" height="200" /> 
        <rect x="16" y="210" rx="10" ry="10" width="200" height="20" /> 
        <rect x="16" y="262" rx="10" ry="10" width="284" height="20" /> 
        <rect x="16" y="235" rx="10" ry="10" width="249" height="20" /> 
    </ContentLoader>
)

export default DashboardSkeleton;
