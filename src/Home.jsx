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
        <div className="w-[80%] mt-16 flex justify-center md:justify-evenly items-center flex-col md:flex-row">
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
            className="mb-8 w-[320px] h-[320px]"
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
            {!login && (
              <button
                className="bg-slate-950 font-medium text-slate-50 flex justify-center items-center font-Montserrat px-6 py-3 rounded mx-auto mb-6 tracking-wide text-[18px]"
                onClick={googleLoginEventHandler}
              >
                Create Yours Now!
              </button>
            )}
            {login && (
              <button
                className="bg-slate-950 font-medium text-slate-50 flex justify-center items-center font-Montserrat px-6 py-3 rounded mx-auto mt-6 tracking-wide text-[18px]"
                onClick={() => navigate("/dashboard")}
              >
                Go To Dashboard
              </button>
            )}
            <p className="font-Montserrat font-medium text-xl mt-5 text-center">
              Unify your online presence with Link Forest
            </p>
            <div className="w-full flex justify-center items-center mt-6">
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
        {/* <div className="flex flex-col justify-center items-center w-full">
          <p className="text-3xl md:text-5xl font-semibold font-Montserrat my-10">
            Create Your In <span className="text-emerald-500">5 Steps</span>
          </p>
          <div className="flex justify-evenly items-start w-full">
            <ul>
              <li className="px-4 py-2 bg-slate-200 mb-3 rounded cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 hover:scale-105 font-Montserrat">
                Create Account And Username
              </li>
              <li className="px-4 py-2 bg-slate-200 mb-3 rounded cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 hover:scale-105 font-Montserrat">
                Enter Name And Description
              </li>
              <li className="px-4 py-2 bg-slate-200 mb-3 rounded cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 hover:scale-105 font-Montserrat">
                Add Links
              </li>
              <li className="px-4 py-2 bg-slate-200 mb-3 rounded cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 hover:scale-105 font-Montserrat">
                Select Theme
              </li>
              <li className="px-4 py-2 bg-slate-200 mb-3 rounded cursor-pointer ease-linear hover:ease-linear transition-all hover:transition-all duration-200 hover:duration-200 hover:scale-105 font-Montserrat">
                You Are Ready 🚀
              </li>
            </ul>
          </div>
        </div> */}
        <div
          className="mt-10 w-full cursor-pointer"
          onClick={() => window.open("https://www.krishjotaniya.live")}
        >
          <p className="font-Montserrat font-semibold py-3 text-center">
            Developed With ❤️ By Krish Jotaniya
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
