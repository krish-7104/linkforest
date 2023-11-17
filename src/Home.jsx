import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { auth } from "./backend/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import PARTYPOPPER from "./assets/partypopper.json";

const Index = () => {
  const provider = new GoogleAuthProvider();
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogin(false);
      } else {
        setLogin(true);
      }
    });
  }, []);

  const googleLoginEventHandler = () => {
    toast.loading("Logging In");
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.dismiss();
        toast.success("Login Successfull");
        setLogin(true);
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error);
        toast.error("Login Failed");
      });
  };

  return (
    <div className="h-[100vh] w-full">
      <div className="mt-28 flex justify-center items-center flex-col w-full">
        <motion.p
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-6xl md:text-8xl font-Montserrat uppercase text-center font-bold tracking-wide text-slate-950 w-[80%]"
        >
          Link <span className="text-emerald-500">Forest</span>
        </motion.p>
        <motion.p
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-8 font-Montserrat font-semibold text-center text-xl md:text-3xl w-[80%]"
        >
          <span className="text-emerald-500 mx-1 text-xl md:text-3xl">
            &quot;
          </span>
          Simplify your{" "}
          <span className="border-b-2 border-emerald-500">online presence</span>{" "}
          with Link Forest
          <span className="text-emerald-500 mx-1 text-2xl md:text-4xl">
            &quot;
          </span>
        </motion.p>
        <div className="bg-slate-200 w-full p-6 mt-10 font-Montserrat text-center font-semibold tracking-wide flex justify-center items-center flex-col relative pb-20">
          <p>
            Link Forest Official App Launched With Analytics Feature 🎉 Download
            Now!
          </p>
          <a href="https://play.google.com/store/apps/details?id=com.krish.linkforest&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
            <img
              alt="Get it on Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              className="h-20 mt-4"
            />
          </a>
          <Lottie
            animationData={PARTYPOPPER}
            loop={true}
            size={10}
            className="w-32 absolute -bottom-4"
          />
        </div>
        <div className="mt-10">
          {!login && (
            <button
              className="text-slate-950 flex junpstify-center items-center font-Montserrat px-6 py-3 rounded mx-auto tracking-wide text-[18px] ease-linear hover:ease-linear transition-all hover:transition-all duration-300 hover:duration-300 font-semibold bg-emerald-500"
              onClick={googleLoginEventHandler}
            >
              Create Yours Now!
            </button>
          )}
          {login && (
            <button
              className="text-slate-50 bg-slate-950 flex junpstify-center items-center font-Montserrat px-6 py-3 rounded mx-auto tracking-wide text-[18px] ease-linear hover:ease-linear transition-all hover:transition-all duration-300 hover:duration-300 font-semibold"
              onClick={() => navigate("/dashboard")}
            >
              Go To Dashboard
            </button>
          )}
        </div>
        <div className="w-[80%] mt-8 flex justify-center md:justify-evenly items-center flex-col md:flex-row">
          <motion.img
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            src={require("./assets/homeDown.png")}
            width={400}
            height={400}
            alt=""
            className="mb-8 w-[320px] h-[320px] md:w-[450px] md:h-[450px]"
          />
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
          >
            <p className="font-Montserrat font-extrabold md:font-bold text-5xl md:text-8xl mt-5 text-center md:text-left uppercase md:capitalize leading-[55px] md:leading-none tracking-wider md:tracking-normal">
              Create
              <br />
              Bio
              <br />
              Links.
            </p>
          </motion.div>
        </div>
        <div className="w-[80%] mt-8 flex justify-center md:justify-evenly items-center flex-col md:flex-row-reverse">
          <motion.img
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            src={require("./assets/homePageUp.png")}
            width={400}
            height={400}
            alt=""
            className="mb-8 w-[320px] h-[320px] md:w-[450px] md:h-[450px]"
          />
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
          >
            <p className="font-Montserrat font-medium text-xl mt-5 text-center">
              Unify your online presence with Link Forest
            </p>
            <p className="font-Montserrat font-medium text-xl mt-5 text-center">
              Create Your's In Just Minutes.
            </p>
            <p className="font-Montserrat font-medium text-xl mt-5 text-center">
              Different Themes And Minimal Looks.
            </p>
            <p className="font-Montserrat font-medium text-xl mt-5 text-center">
              And Its Free Forever 100%
            </p>
            <div className="w-full flex justify-center items-center mt-6 mb-10 md:mb-0">
              <a
                href="https://www.producthunt.com/posts/link-forest?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-link&#0045;forest"
                target="_blank"
                className="mx-auto"
                rel="noreferrer"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=373167&theme=light"
                  alt="Link&#0032;Forest - Your&#0032;one&#0045;stop&#0032;hub&#0032;for&#0032;all&#0032;your&#0032;social&#0032;and&#0032;important&#0032;links | Product Hunt"
                  width="180"
                  height="45"
                />
              </a>
            </div>
          </motion.div>
        </div>
        <div className="w-[80%] mt-8 flex justify-center md:justify-evenly items-center flex-col md:flex-row">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/kN5K4Yaem-s?si=XHFsKxztdotPlG58"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div
          className="mt-10 mb-2 w-full cursor-pointer"
          onClick={() => window.open("https://www.krishjotaniya.live")}
        >
          <p className="font-Montserrat md:text-lg font-semibold py-3 text-center">
            Developed With ❤️ By Krish Jotaniya
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
