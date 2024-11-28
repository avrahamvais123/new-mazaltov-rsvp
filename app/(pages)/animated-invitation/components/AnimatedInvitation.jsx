"use client";

import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import BabyStroller from "@/public/lottie-animations/Baby-Stroller.json";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedInvitation = () => {
  const [showBabyStroller, setShowBabyStroller] = useState(true);
  const [wrapperAnimate, setWrapperAnimate] = useState({});
  const [titleStyles, setTitleStyles] = useState({});

  /* useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBabyStroller(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []); */

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWrapperAnimate((prev) => ({ ...prev, height: "100%" }));
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      animate={{ justifyContent: wrapperAnimate?.justifyContent }}
      className="size-full p-8 flex-col-center"
    >
      <motion.div animate={{ height: wrapperAnimate?.height }} className="flex-col-center justify-between">
        <motion.h1 className="text-5xl md:text-7xl w-full text-center">
          הזמנה לברית
        </motion.h1>
        <AnimatePresence>
          {showBabyStroller && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-[30rem] max-h-[30rem] size-full h-fit"
            >
              <Lottie className="" animationData={BabyStroller} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedInvitation;
