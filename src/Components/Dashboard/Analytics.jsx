import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../backend/firebaseConfig";
import { userContext } from "../../Contexts/userContext";
import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaSnapchat,
  FaThreads,
  FaXTwitter,
} from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import SocialMediaItem from "../Analysis/SocialMediaItem";
import { toast } from "react-hot-toast";

const socialIcons = {
  Instagram: FaInstagram,
  Linkedin: FaLinkedinIn,
  Github: FaGithub,
  Twitter: FaXTwitter,
  Facebook: FaFacebookF,
  Threads: FaThreads,
  Mail: FaEnvelope,
  Snapchat: FaSnapchat,
};

const Analytics = () => {
  const contextData = useContext(userContext);
  const [links, setLinks] = useState([]);
  const [social, setSocials] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});
  const getFormattedDate = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${JSON.stringify(
      date.getUTCFullYear()
    ).slice(2)}`;
  };

  const calculateViewsData = (newData) => {
    const viewsData = {
      total: 0,
      today: 0,
      yesterday: 0,
      year: 0,
    };

    Object.keys(newData).forEach((item) => {
      viewsData.total += newData[item];
      const currentYear = JSON.stringify(new Date().getFullYear()).slice(2);
      if (item.includes(`-${currentYear}`)) {
        viewsData.year += newData[item];
      }
    });

    const date = new Date();
    const todaysDate = getFormattedDate(date);

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const formattedYesterdayDate = getFormattedDate(yesterdayDate);

    viewsData.today = newData[todaysDate];
    viewsData.yesterday = newData[formattedYesterdayDate];

    return viewsData;
  };

  const getAnalyticsData = async () => {
    try {
      const docRef = doc(db, "Analytics", contextData.data.userInfo.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const linksData = data.links || {};
        const socialLinksData = data.socialLinks || {};

        const newData = { ...data };
        delete newData.links;
        delete newData.socialLinks;

        setLinks(linksData);
        setSocials(socialLinksData);

        const viewsData = calculateViewsData(newData);
        setAnalyticsData(viewsData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  useEffect(() => {
    getAnalyticsData();
  }, [contextData.data.userInfo.id]);

  return (
    <div className="flex justify-center items-center flex-col">
      <p className="font-Montserrat font-bold mb-4 text-xl w-full">
        Quick Cards
      </p>
      {analyticsData && (
        <section className="flex justify-evenly items-center w-full">
          <div className="w-full flex-col bg-slate-100 mx-5 px-3 py-2 rounded-md shadow">
            <p className="font-Montserrat text-sm mb-1 medium">Today's</p>
            <p className="font-Montserrat text-lg font-semibold">
              {analyticsData.today ? analyticsData.today : 0}
            </p>
          </div>
          <div className="w-full flex-col bg-slate-100 mx-5 px-3 py-2 rounded-md shadow">
            <p className="font-Montserrat text-sm mb-1 medium">Yesterday's</p>
            <p className="font-Montserrat text-lg font-semibold">
              {analyticsData.yesterday ? analyticsData.yesterday : 0}
            </p>
          </div>
          <div className="w-full flex-col bg-slate-100 mx-5 px-3 py-2 rounded-md shadow">
            <p className="font-Montserrat text-sm mb-1 medium">This Year's</p>
            <p className="font-Montserrat text-lg font-semibold">
              {analyticsData.year ? analyticsData.year : 0}
            </p>
          </div>
          <div className="w-full flex-col bg-slate-100 mx-5 px-3 py-2 rounded-md shadow">
            <p className="font-Montserrat text-sm mb-1 medium">All Time's</p>
            <p className="font-Montserrat text-lg font-semibold">
              {analyticsData.total ? analyticsData.total : 0}
            </p>
          </div>
        </section>
      )}
      {social && Object.entries(social).length !== 0 && (
        <section className="mt-6 w-full">
          <p className="font-Montserrat font-bold my-4 text-xl">
            Socials Links
          </p>
          <ul className="flex w-full flex-wrap mt-2">
            {Object.entries(social).map(([platform, data]) => (
              <SocialMediaItem
                key={platform}
                icon={socialIcons[platform]} // Assuming you have an object mapping icons to platforms
                value={data}
              />
            ))}
          </ul>
        </section>
      )}

      {social && Object.entries(social).length !== 0 && (
        <section className="mt-6 w-full">
          <p className="font-Montserrat font-bold my-4 text-xl">Websites</p>
          <section className="flex w-full flex-wrap my-2">
            {Object.keys(links).map((item) => {
              return (
                <div className="w-full flex items-center font-medium text-sm font-Montserrat bg-slate-100 mr-4 rounded-md py-2 justify-between mb-4 px-4">
                  <p>{item}</p>
                  <p className="flex">
                    {Object.values(links[item]).reduce(
                      (total, value) => total + value,
                      0
                    )}{" "}
                    <AiOutlineEye className="ml-2 text-lg" />
                  </p>
                </div>
              );
            })}
          </section>
        </section>
      )}
    </div>
  );
};

export default Analytics;
