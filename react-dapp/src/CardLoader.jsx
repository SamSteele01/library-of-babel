import React from 'react';

import ContentLoader from "react-content-loader"

export const CardLoader = () => (
  <ContentLoader
    height={200}
    width={400}
    speed={4}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="25" y="15" rx="5" ry="5" width="220" height="45" />
    <rect x="25" y="135" rx="5" ry="5" width="220" height="10" />
    <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
    <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
    <rect x="29" y="159" rx="0" ry="0" width="81" height="23" />
    <rect x="161" y="164" rx="0" ry="0" width="77" height="13" />
  </ContentLoader>
)
