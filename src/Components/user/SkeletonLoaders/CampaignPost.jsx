import React from "react";
import ContentLoader from "react-content-loader";
import {Code} from "react-content-loader";
const CampaignPostSkeleton = ({...props }) => (
  <>
    <div className="mt-[30px] w-[100vw] flex flex-col items-center gap-[30px]">
      <ContentLoader
        speed={1}
        width="340"
        height="120"
        backgroundColor="#ffffff66"
        foregroundColor="rgba(255, 255, 255, 0.7)"
        {...props}
      >
        <rect x="0" y="5" rx="30" ry="30" width="340" height="120">
          <animate attributeName="fill" dur="3s" repeatCount="indefinite" />
        </rect>
      </ContentLoader>
    

    <ContentLoader
      speed={1}
      width= "340"
      height="215"
      backgroundColor="#ffffff66"
      foregroundColor="rgba(255, 255, 255, 0.7)"
      {...props}
    >
      <rect x="0" y="0" rx="5" ry="5" width="70%" height="15" />
      <rect x="0" y="20" rx="5" ry="5" width="100%" height="15" />
      <rect x="0" y="40" rx="5" ry="5" width="90%" height="15" />
      <rect x="0" y="60" rx="5" ry="5" width="95%" height="15" />
      <rect x="0" y="80" rx="5" ry="5" width="100%" height="15" />
      <rect x="0" y="100" rx="5" ry="5" width="90%" height="15" />
      <rect x="0" y="120" rx="5" ry="5" width="95%" height="15" />
      <rect x="0" y="140" rx="5" ry="5" width="100%" height="15" />
      <rect x="0" y="160" rx="5" ry="5" width="90%" height="15" />
      <rect x="0" y="180" rx="5" ry="5" width="95%" height="15" />
      <rect x="0" y="200" rx="5" ry="5" width="100%" height="15" />
    </ContentLoader>
    <ContentLoader
      speed={1}
      width={300}
      height={250}
      backgroundColor="#ffffff66"
      foregroundColor="rgba(255, 255, 255, 0.7)"
      {...props}
    >
      <rect x="0" y="5" rx="20" ry="20" width={300} height={250}>
        <animate attributeName="fill" dur="3s" repeatCount="indefinite" />
      </rect>
    </ContentLoader>
    <Code
      backgroundColor="#ffffff66"
      foregroundColor="rgba(255, 255, 255, 0.7)"
      width={340}
    />
    </div>
  </>
);

export default CampaignPostSkeleton;
