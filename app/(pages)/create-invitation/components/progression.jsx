"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import SlideOne from "./SlideOne";
import StepsBar from "@/app/ui/StepsBar";
import SlideTwo from "./SlideTwo";
import SlideThree from "./SlideThree";

const stepsData = [
  {
    id: 1,
    name: "פרטי האירוע",
    description: "פרטי האירוע",
    Component: SlideOne,
    status: "current",
  },
  {
    id: 2,
    name: "העלאת תמונות",
    description: "העלאת תמונות",
    Component: SlideTwo,
    status: "",
  },
  {
    id: 3,
    name: "תשלום",
    description: "תשלום",
    Component: SlideThree,
    status: "",
  },
];

export default function Progression() {
  const [carouselApi, setCarouselApi] = useState(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [steps, setSteps] = React.useState(stepsData);

  console.log("carouselApi: ", carouselApi);
  console.log("current: ", current);
  console.log("count: ", count);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  return (
    <div className="size-full p-4 overflow-hidden flex flex-col justify-start items-center">
      {/* title and StepsBar */}
      <div className="flex flex-col items-center justify-center gap-5 my-2 md:my-6 mb-10">
        <h1 className="text-2xl font-medium text-slate-400">יצירת הזמנה</h1>
        <StepsBar steps={steps} setSteps={setSteps} current={current} />
      </div>

      {/* carousel */}
      <Carousel
        options={{ direction: "rtl", watchDrag: false }}
        setApi={(api) => setCarouselApi(api)}
        className="size-full max-w-sm"
      >
        <CarouselContent>
          {steps.map(({ Component }, index) => (
            <CarouselItem key={index}>
              <Component setSteps={setSteps} carouselApi={carouselApi} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
