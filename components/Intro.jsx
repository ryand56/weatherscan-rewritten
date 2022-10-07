import * as React from "react";

import { useWinSizeInner, useWinSizeOuter } from "../hooks/useWinSize";

const resizeWindow = (mainRef, winWidth, winHeight) => {
    const mainAspect = 4/3;
    const windowAspect = winWidth / winHeight;
    let scale;

    const main = document.getElementById("main");

    if (main instanceof HTMLElement) {
        const mainWidth = main.style.outerWidth;
        const mainHeight = main.style.outerHeight;

        if (windowAspect >= mainAspect) {
            scale = winHeight / mainHeight;
        } else {
            scale = winWidth / mainWidth;
        }
    
        mainRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
};

const Intro = ({ display }) => {
    const [innerWidth, innerHeight] = useWinSizeInner();
    const mainRef = React.useRef();

    function resizeListener(e) {
        resizeWindow(mainRef, innerWidth, innerHeight);
    }

    React.useEffect(() => {
        if (typeof window === undefined) {
            return;
        }

        if (mainRef && mainRef.current) {
            resizeListener();
        }
    }, [mainRef, innerWidth, innerHeight]);

    return (
        <div ref={mainRef} className={`relative top-1/2 left-1/2 overflow-hidden w-[1440px] h-[1080px] will-change-transform ${display ? "block" : "hidden"}`}>
            <div className="h-[23.5%] w-full absolute bottom-0 bg-[#161418]">
                <div className="absolute w-[400px] left-[8.05%] top-[4.6%] flex flex-row flex-col">
                    <div className="whitespace-nowrap relative font-['Frutiger'] font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">headend id:</div>
                    <div className="whitespace-nowrap relative font-['Frutiger'] font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">serial number:</div>
                    <div className="whitespace-nowrap relative font-['Frutiger'] font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">location name:</div>
                    <div className="whitespace-nowrap relative font-['Frutiger'] font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">affiliate name:</div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
