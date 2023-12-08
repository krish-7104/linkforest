import React from "react";

const SocialMediaItem = ({ icon, value }) => {
  const IconComponent = icon;

  return (
    <li className="w-[10%] flex items-center font-semibold font-Montserrat bg-slate-100 mr-4 rounded-md py-1 justify-center">
      <IconComponent className="mr-2" />
      {Object.values(value).reduce((total, val) => total + val, 0)}
    </li>
  );
};
export default SocialMediaItem;
