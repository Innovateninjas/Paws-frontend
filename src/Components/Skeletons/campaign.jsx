import React from "react";
import ContentLoader from "react-content-loader";
import { List ,Code, BulletList  } from 'react-content-loader'
const Campaign = ({ width , height, ...props }) => (
  <>
  <ContentLoader
    speed={1}
    width={width}
    height={height}
    backgroundColor="#f5f2f2"
    foregroundColor="#e3e1e1"
    {...props}
  >
    <rect x="0" y="5"  rx="20" ry="20" width={width} height={height}>
      <animate attributeName="fill" dur="3s" repeatCount="indefinite" />
    </rect>
   
  </ContentLoader>
  
  <List />
  <BulletList />
  <ContentLoader
    speed={1}
    width={width}
    height={500}
    backgroundColor="#f5f2f2"
    foregroundColor="#e3e1e1"
    {...props}
  >
    <rect x="0" y="5"  rx="20" ry="20" width={width} height={500}>
      <animate attributeName="fill" dur="3s" repeatCount="indefinite" />
    </rect>
   
  </ContentLoader>
  <Code />
  </>

);

export default Campaign;
