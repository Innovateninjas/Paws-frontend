import React from "react";
import ContentLoader from "react-content-loader";

const MapSkeleton = ({ width , height, ...props }) => (
  <>
  <ContentLoader
    speed={1}
    width={width}
    height={height}
    backgroundColor="#ffffff66"
    foregroundColor="rgba(255, 255, 255, 0.7)"
    {...props}
  >
    <rect x="0" y="0"  rx="30" ry="30" width={width} height={height}>
      <animate attributeName="fill" dur="3s" repeatCount="indefinite" />
    </rect>
  </ContentLoader>
  </>

);

export default MapSkeleton;
