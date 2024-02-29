import React from "react";
import ContentLoader from "react-content-loader";

const MapSkeleton = ({ width , height, ...props }) => (
  <>
  <ContentLoader
    speed={1}
    width={width}
    height={height}
    backgroundColor="#f9f9f9"
    foregroundColor="#e0e0e0"
    {...props}
  >
    <rect x="0" y="0"  rx="20" ry="20" width={width} height={height}>
      <animate attributeName="fill" dur="3s" repeatCount="indefinite" />
    </rect>
  </ContentLoader>
  </>

);

export default MapSkeleton;
