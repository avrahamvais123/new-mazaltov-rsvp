"use client";

import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import BabyStroller from "@/public/lottie-animations/Baby-Stroller.json";
import { AnimatePresence, motion } from "framer-motion";
import WordPullUp from "@/components/ui/word-pull-up";
import AnimationText from "./AnimationText";

const AnimatedInvitation = () => {
  const [showText, setShowText] = useState(false);
  const [showBabyStroller, setShowBabyStroller] = useState(true);
  const [wrapperAnimate, setWrapperAnimate] = useState({});
  const [titleStyles, setTitleStyles] = useState({});

  const text = `בשבח והודיה לה׳ יתברך
  אנו שמשחים להודיעכם על הכנסת בננו
  בבריתו של אברהם אבינו ע׳׳ה`;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWrapperAnimate((prev) => ({ ...prev, height: "100%" }));
      setShowText(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      animate={{ justifyContent: wrapperAnimate?.justifyContent }}
      className="size-full p-8 flex-col-center"
    >
      <motion.div
        animate={{ height: wrapperAnimate?.height }}
        className="flex-col-center justify-between"
      >
        <motion.h1 className="text-4xl md:text-6xl w-full text-center">
          הזמנה לברית
        </motion.h1>

        {showText && <AnimationText text={text} />}

        <AnimatePresence>
          {showBabyStroller && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-[25rem] max-h-[25rem] size-full h-fit"
            >
              <Lottie animationData={BabyStroller} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedInvitation;
