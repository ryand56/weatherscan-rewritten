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
            <div id="blackbar" className="h-[23.5%] w-full absolute bottom-0 bg-[#161418]">
                <div className="absolute w-[400px] left-[8.05%] top-[4.6%] flex flex-row flex-col">
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">headend id:</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">serial number:</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">location name:</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">affiliate name:</div>
                </div>
                <div className="absolute w-[400px] left-[8.05%] top-[4.6%] flex flex-row flex-col hidden">
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">appearance settings</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">location settings</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">weather settings</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">other settings</div>
                    <div className="whitespace-nowrap relative font-frutiger font-semibold text-[#d8c422] text-[31.5px] tracking-[1px] pt-6">Save</div>
                </div>
                <img className="object-contain absolute w-[500px] h-[175px] right-[1.9%] -top-[9px]" src="/images/weatherlogos.png" />
            </div>
            <div id="appearancesettingspane" className="pt-[200px] hidden">
                <select name="background" id="background">
                    <option value="oldnologo">old background no logo</option>
                    <option value="oldnormal">old background twc logo</option>
                    <option value="oldearthday">old background earthday twc logo</option>
                    <option value="nologo">no nogo</option>
                    <option value="normal">twc logo</option>
                    <option value="earthday">earthday twc logo</option>
                    <option value="custom">custom background</option>
                </select>
                <select name="sidebar" id="sidebar">
                    <option value="normalsidebar">normal sidebar</option>
                    <option value="2005sidebar">2005 sidebar</option>
                </select>
                <select name="citybackground" id="citybackground">
                    <option value="city">city</option>
                    <option value="beach">beach</option>
                    <option value="fence">fence</option>
                    <option value="custom">custom</option>
                </select>
                <button name="slide" id="slide" />
            </div>
            <div id="locationsettingspane" className="pt-[200px]">
                <div id="weathertitle" className="absolute w-full text-center text-[56px] top-[16px]">Location Settings</div>
            </div>
            <img className="object-contain object-center w-[625px] h-[205px] block m-[0px] m-auto mt-[440px]" src="/images/intellistarlogo.png" />
        </div>
    );
};

export default Intro;
