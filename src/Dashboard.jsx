"use client";
import React, { useContext, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./backend/firebaseConfig";
import { useNavigate } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import DashboardSection from "./DashboardSection";
import { userContext } from "./Contexts/userContext";
import OneSignal from "react-onesignal";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    OneSignal.init({ appId: process.env.REACT_APP_ONESIGNAL }).then(() => {
      OneSignal.Slidedown.promptPush();
    });
  }, []);
  const [loading, setLoading] = useState(true);
  const contextData = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        navigate("/");
      } else {
        contextData.setData({
          ...contextData.data,
          userInfo: {
            ...contextData.data.userInfo,
            id: user.uid,
          },
        });
        getDataFromServer(user.uid);
      }
    });
    const getDataFromServer = async (id) => {
      const docRef = doc(db, "Link Forests", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        contextData.setData({
          ...contextData.data,
          userInfo: {
            description: docSnap.data().description,
            image: docSnap.data().image
              ? docSnap.data().image
              : "https://firebasestorage.googleapis.com/v0/b/link-forest.appspot.com/o/noImage.png?alt=media&token=af7f81d0-1c93-4120-9824-df8c62d90fcd",
            username: docSnap.data().username,
            name: docSnap.data().name,
            id: docSnap.id,
          },
          socialLinks: {
            ...docSnap.data().socialLinks,
          },
          customTheme: {
            ...(docSnap.data().customTheme
              ? docSnap.data().customTheme
              : {
                  background: "#ffffff",
                  textColor: "#000",
                  linkBackground: "#e2e8f0",
                  linkColor: "#000",
                }),
          },
          websites: {
            ...docSnap.data().websites,
          },
          themeType: docSnap.data().themeType
            ? docSnap.data().themeType
            : "default",
          theme: docSnap.data().theme ? docSnap.data().theme : "Default",
        });
        if (!docSnap.data().themeType || !docSnap.data().customTheme) {
          const updateRef = doc(db, "Link Forests", docSnap.id);
          await updateDoc(updateRef, {
            customTheme: {
              background: "#ffffff",
              textColor: "#000",
              linkBackground: "#e2e8f0",
              linkColor: "#000",
            },
            theme: "Default",
            themeType: "default",
            updatedTime: serverTimestamp(),
          });
        }
      } else {
        sessionStorage.setItem("type", Math.random() * 1000);
        navigate("/username", { state: { type: "new" } });
      }
      setLoading(false);
    };
  }, []);

  return (
    <div className="h-[100vh] w-full bg-[#f9fafc]">
      {loading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <HashLoader color="#34d399" />
        </div>
      ) : (
        <div className="flex justify-center mx-auto md:justify-between items-center w-full flex-col md:flex-row">
          <div className="flex 2xl:max-w-[1500px] mx-auto w-full flex-col md:flex-row">
            <div className="w-full md:w-[40%] flex justify-center items-end 2xl:items-center h-[100vh] relative pb-6 md:pb-10">
              <ProfileSection />
            </div>
            <div className="md:hidden w-[90%] mb-6 flex justify-center mx-auto flex-col items-center">
              <p className="text-center font-Montserrat font-bold text-lg">
                {!show
                  ? "Download Our App For Better Mobile Experience of The Dashboard And Use New Realtime Analytics Feature!"
                  : "Download Our App To Use Realtime Analytics Feature!"}
              </p>
              <a href="https://play.google.com/store/apps/details?id=com.krish.linkforest&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                <img
                  alt="Get it on Google Play"
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  className="h-20 mt-2"
                />
              </a>
              {!show && (
                <p
                  className="mt-2 font-Montserrat font-medium text-sm p-2"
                  onClick={() => setShow(true)}
                >
                  Continue With Web Version
                </p>
              )}
            </div>
            <DashboardSection />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
