"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import SlideUploadImage from "./SlideUploadImage";
import StepsBar from "@/app/ui/StepsBar";
import SlideOptions from "./SlideOptions";
import SlidePayment from "./SlidePayment";

const stepsData = [
  {
    id: 1,
    name: "העלאת הזמנה",
    description: "העלאת הזמנה",
    Component: SlideUploadImage,
    status: "current",
  },
  {
    id: 2,
    name: "כמות מוזמנים",
    description: "כמות מוזמנים",
    Component: SlideOptions,
    status: "",
  },
  {
    id: 3,
    name: "תשלום",
    description: "תשלום",
    Component: SlidePayment,
    status: "",
  },
];

export default function Progression() {
  const [carouselApi, setCarouselApi] = useState(null);
  /* current for the StepsBar */
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  /* steps for the slides */
  const [steps, setSteps] = React.useState(stepsData);

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
      <div className="my-2 md:my-6 mb-10 flex flex-col items-center justify-center gap-5">
        <StepsBar steps={steps} setSteps={setSteps} current={current} />
      </div>

      {/* carousel */}
      <Carousel
        options={{ direction: "rtl", watchDrag: false }}
        setApi={(api) => setCarouselApi(api)}
        className="size-full flex flex-col overflow-hidden"
      >
        <CarouselContent className="size-full" WrapperClassName="size-full">
          {steps.map(({ Component }, index) => (
            <CarouselItem key={index} className="size-full flex-center">
              <Component setSteps={setSteps} carouselApi={carouselApi} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
