import React from "react";
import ContentLoader from "react-content-loader";

const ViewreportsSkeletonLoader = (props) => {
  return (
    <> 
    <ContentLoader
  speed={1}
  width="100%"
  height="100%"
  backgroundColor="#ffffff66"
  foregroundColor="rgba(255, 255, 255, 0.7)"
  {...props}
>
  <rect x="20%" y="0" rx="15" ry="15" width="60%" height="48" transform="translate(-50%, 0)"  />
  <rect x="5%" y="70" rx="20" ry="20" width={350} height={250} transform="translate(-50%, 0)" />
  <rect x="5%" y="335" rx="20" ry="20" width={350} height={250} transform="translate(-50%, 0)" />
  <rect x="5%" y="610" rx="20" ry="20" width={350} height={220} transform="translate(-50%, 0)" />
</ContentLoader>
</>

  );
};

export default ViewreportsSkeletonLoader;
