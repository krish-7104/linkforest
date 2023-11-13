import React, { useContext } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaFacebook,
  FaEnvelope,
  FaThreads,
  FaSnapchat,
} from "react-icons/fa6";
import { userContext } from "./Contexts/userContext";
const ProfileSection = () => {
  const contextData = useContext(userContext);
  return (
    <div
      className={`rounded-2xl border shadow-md 2xl:h-[66vh] h-[70vh] md:h-[80vh] w-[75%] md:w-[55%] flex justify-start items-center flex-col px-6 overflow-scroll pb-4 mb-8 md:mb-0`}
      style={{
        backgroundColor: `${contextData.data?.customTheme?.background?.toString(
          16
        )}`,
      }}
    >
      <img
        src={
          contextData.data?.userInfo?.image === undefined
            ? "https://firebasestorage.googleapis.com/v0/b/link-forest.appspot.com/o/noImage.png?alt=media&token=af7f81d0-1c93-4120-9824-df8c62d90fcd"
            : contextData.data?.userInfo?.image
        }
        className="shadow rounded-full h-[80px] w-[80px] align-middle border-none object-cover mt-6"
        alt=""
        width={80}
        height={80}
      />
      <p
        className="mt-2 font-Montserrat font-semibold text-lg"
        style={{
          color: `${contextData.data?.customTheme?.textColor?.toString(16)}`,
        }}
      >
        {contextData.data?.userInfo?.name}
      </p>
      <p
        className="mt-2 font-Montserrat font-medium text-xs text-center"
        style={{
          color: `${contextData.data?.customTheme?.textColor?.toString(16)}`,
        }}
      >
        {contextData.data.userInfo?.description}
      </p>
      {contextData.data?.socialLinks && (
        <div className="flex justify-center items-center w-[70%] mt-4">
          {contextData.data?.socialLinks?.facebook && (
            <a
              target="_blank"
              href={contextData?.data?.socialLinks?.facebook}
              className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
              style={{
                color: `${contextData.data?.customTheme?.textColor?.toString(
                  16
                )}`,
              }}
              rel="noreferrer"
            >
              <FaFacebook />
            </a>
          )}
          {contextData?.data?.socialLinks?.twitter && (
            <a
              target="_blank"
              href={contextData?.data?.socialLinks?.twitter}
              className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
              style={{
                color: `${contextData.data?.customTheme?.textColor?.toString(
                  16
                )}`,
              }}
              rel="noreferrer"
            >
              <FaXTwitter />
            </a>
          )}
          {contextData?.data?.socialLinks?.instagram && (
            <a
              target="_blank"
              href={contextData?.data?.socialLinks?.instagram}
              className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
              style={{
                color: `${contextData.data?.customTheme?.textColor?.toString(
                  16
                )}`,
              }}
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
          )}
          {contextData?.data?.socialLinks?.linkedin && (
            <a
              target="_blank"
              href={contextData?.data?.socialLinks?.linkedin}
              className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
              style={{
                color: `${contextData.data?.customTheme?.textColor?.toString(
                  16
                )}`,
              }}
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          )}
          {contextData?.data?.socialLinks?.github && (
            <a
              target="_blank"
              href={contextData?.data?.socialLinks?.github}
              className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
              style={{
                color: `${contextData.data?.customTheme?.textColor?.toString(
                  16
                )}`,
              }}
              rel="noreferrer"
            >
              <FaGithub />
            </a>
          )}
          {contextData?.data?.socialLinks?.email && (
            <a
              target="_blank"
              href={`mailto:${contextData?.data?.socialLinks?.email}`}
              className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
              style={{
                color: `${contextData.data?.customTheme?.textColor?.toString(
                  16
                )}`,
              }}
              rel="noreferrer"
            >
              <FaEnvelope />
            </a>
          )}
          {contextData?.data?.socialLinks?.threads && (
            <a
              target="_blank"
              href={`mailto:${contextData?.data?.socialLinks?.threads}`}
              className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
              style={{
                color: `${contextData.data?.customTheme?.textColor?.toString(
                  16
                )}`,
              }}
              rel="noreferrer"
            >
              <FaThreads />
            </a>
          )}
          {contextData?.data?.socialLinks?.snapchat && (
            <a
              target="_blank"
              href={contextData?.data?.socialLinks?.snapchat}
              className="text-sm transition-all duration-300 ease-linear hover:ease-linear hover:scale-125 hover:duration-300 hover:transition-all mx-2"
              style={{
                color: `${contextData.data?.customTheme?.textColor?.toString(
                  16
                )}`,
              }}
              rel="noreferrer"
            >
              <FaSnapchat />
            </a>
          )}
        </div>
      )}
      <ul
        className={`flex justify-center font-medium items-center flex-col w-[95%] gap-4 mt-5`}
      >
        {contextData?.data?.websites &&
          Object.keys(contextData?.data?.websites).map((website, index) => (
            <li
              style={{
                borderColor: `${
                  contextData?.data?.themeType === "default" &&
                  contextData?.data?.customTheme?.stroke &&
                  contextData?.data?.customTheme?.stroke?.toString(16)
                }`,
                backgroundColor: `${contextData.data?.customTheme?.linkBackground?.toString(
                  16
                )}`,
                color: `${contextData.data?.customTheme?.linkColor?.toString(
                  16
                )}`,
              }}
              onClick={() =>
                window.open(contextData?.data?.websites[website].link)
              }
              key={index}
              className={`bg-slate-200 px-[6px] py-[6px] md:py-[8px] text-xs md:text-[12px] w-full text-center rounded-md font-Montserrat transition-all duration-300 ease-linear hover:ease-linear hover:scale-105 hover:duration-300 hover:transition-all cursor-pointer ${
                contextData?.data?.customTheme?.stroke && `border-[1.4px]`
              }`}
            >
              {contextData?.data?.websites[website].title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProfileSection;
