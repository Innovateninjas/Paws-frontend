import React from "react";
import ContentLoader from "react-content-loader";

const Viewreports = (props) => {
  return (
<ContentLoader
  speed={1}
  width={390}
  height={1000}
  backgroundColor="#f9f9f9"
  foregroundColor="#e0e0e0"
  {...props}
>
  <rect x="10" y="20" rx="20" ry="15" width="370" height={120}/>
  <rect x="23" y="150" rx="15" ry="15" width="330" height="400" /> 
  <rect x="23" y="570" rx="15" ry="15" width="330" height="400" /> 
  <animate attributeName="fill" dur="3s" repeatCount="indefinite" />
</ContentLoader>


  );
};

export default Viewreports;
