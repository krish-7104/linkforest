import Analytics from "./Components/Dashboard/Analytics";
import Other from "./Components/Dashboard/Other";
import Profile from "./Components/Dashboard/Profile";
import Social from "./Components/Dashboard/Social";
import Themes from "./Components/Dashboard/Themes";
import React, { useState } from "react";
import Lottie from "lottie-react";
import NEWANIMATION from "./assets/newAnimation.json";

const DashboardSection = () => {
  const [menu, setMenu] = useState("profile");
  return (
    <div className="border md:h-[100vh] w-full md:w-[60%] flex justify-start items-center flex-col px-4 md:px-6 bg-white md:pb-4 md:p-16">
      <ul className="flex justify-evenly items-center my-4 font-Montserrat font-medium text-base w-[100%]">
        <li
          onClick={() => setMenu("profile")}
          className={`${
            menu === "profile"
              ? "bg-slate-950 text-slate-50 shadow-lg shadow-slate-400/50"
              : "text-slate-950 md:bg-slate-200 ease-linear duration-100 transition-all hover:ease-linear hover:duration-100 hover:transition-all select-none"
          } px-2 py-1 md:py-[6px] rounded-lg text-[14px] md:text-sm w-full text-center mx-2 md:mx-5 cursor-pointer`}
        >
          Profile
        </li>
        <li
          onClick={() => setMenu("social")}
          className={`${
            menu === "social"
              ? "bg-slate-950 text-slate-50 shadow-lg shadow-slate-400/50"
              : "text-slate-950 md:bg-slate-200 ease-linear duration-100 transition-all hover:ease-linear hover:duration-100 hover:transition-all select-none"
          } px-2 py-1 md:py-[6px] rounded-lg text-[14px] md:text-sm w-full text-center mx-2 md:mx-5 cursor-pointer`}
        >
          Socials
        </li>
        <li
          onClick={() => setMenu("other")}
          className={`${
            menu === "other"
              ? "bg-slate-950 text-slate-50 shadow-lg shadow-slate-400/50"
              : "text-slate-950 md:bg-slate-200 ease-linear duration-100 transition-all hover:ease-linear hover:duration-100 hover:transition-all select-none"
          } px-2 py-1 md:py-[6px] rounded-lg text-[14px] md:text-sm w-full text-center mx-2 md:mx-5 cursor-pointer`}
        >
          Websites
        </li>
        <li
          onClick={() => setMenu("analytics")}
          className={`${
            menu === "analytics"
              ? "bg-slate-950 text-slate-50 shadow-lg shadow-slate-400/50"
              : "text-slate-950 md:bg-slate-200 ease-linear duration-100 transition-all hover:ease-linear hover:duration-100 hover:transition-all select-none"
          } px-2 py-1 md:py-[6px] rounded-lg text-[14px] md:text-sm w-full text-center mx-2 md:mx-5 cursor-pointer hidden md:block relative`}
        >
          <Lottie
            animationData={NEWANIMATION}
            loop={true}
            size={10}
            className="w-8 absolute -top-3 -left-3"
          />
          Analytics
        </li>
        <li
          onClick={() => setMenu("themes")}
          className={`${
            menu === "themes"
              ? "bg-slate-950 text-slate-50 shadow-lg shadow-slate-400/50"
              : "text-slate-950 md:bg-slate-200 ease-linear duration-100 transition-all hover:ease-linear hover:duration-100 hover:transition-all select-none"
          } px-2 py-1 md:py-[6px] rounded-lg text-[14px] md:text-sm w-full text-center mx-2 md:mx-5 cursor-pointer`}
        >
          Themes
        </li>
      </ul>
      <div className="w-full overflow-y-scroll p-2 md:p-4">
        {menu === "profile" && <Profile />}
        {menu === "other" && <Other />}
        {menu === "social" && <Social />}
        {menu === "themes" && <Themes />}
        {menu === "analytics" && <Analytics />}
      </div>
    </div>
  );
};

export default DashboardSection;
