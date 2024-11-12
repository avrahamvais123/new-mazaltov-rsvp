"use client"

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(MotionPathPlugin);

const PathAnimation = () => {
    const pathRef = useRef(null);
    const ballRef = useRef(null);

    useGSAP(() => {
        const path = pathRef.current;
        const ball = ballRef.current;

        const pathLength = path.getTotalLength();

        gsap.set(ball, { xPercent: -50, yPercent: -50 });

        gsap.to(ball, {
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
            },
            duration: 5,
            repeat: -1,
            ease: 'none'
        });
    }, [pathRef, ballRef]);

    return (
        <svg viewBox="0 0 800 600">
            <path
                ref={pathRef}
                d="M100,300 Q400,50 700,300 T1300,300"
                fill="none"
                stroke="black"
            />
            <circle ref={ballRef} r="20" fill="red" />
        </svg>
    );
};

export default PathAnimation;
