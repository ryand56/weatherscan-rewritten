import * as React from "react";

import { useWinSizeInner, useWinSizeOuter } from "../hooks/useWinSize";

const resizeWindow = (mainRef) => {
    let scale, windowAspect;

    windowAspect = innerWidth / innerHeight;

    if (windowAspect >= 4/3) {
        scale = innerHeight / outerHeight;
    } else {
        scale = innerWidth / outerWidth;
    }

    mainRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
};

const Intro = ({ display }) => {
    const [innerWidth, innerHeight] = useWinSizeInner();
    const [outerWidth, outerHeight] = useWinSizeOuter();

    const mainRef = React.useRef();

    React.useEffect(() => {
        if (typeof window === undefined) {
            return;
        }

        if (mainRef && mainRef.current) {
            window.addEventListener("resize", (e) => {
                resizeWindow(mainRef);
            });

            resizeWindow(mainRef);
        }
    }, [innerWidth, innerHeight, outerWidth, outerHeight, mainRef]);

    return (
        <div ref={mainRef} className={`relative top-1/2 left-1/2 overflow-hidden w-[1440px] h-[1080px] will-change-transform ${display ? "block" : "none"}`}>
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
