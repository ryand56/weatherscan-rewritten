import * as React from "react";
import Image from "next/image";

import { useWinSizeInner, useWinSizeOuter } from "../hooks/useWinSize";

const resizeWindow = (mainRef, winWidth, winHeight) => {
    const mainAspect = 4/3;
    const windowAspect = winWidth / winHeight;
    let scale;

    const refWidth = mainRef.current.clientWidth;
    const refHeight = mainRef.current.clientHeight;

    if (windowAspect >= mainAspect) {
        scale = winHeight / refHeight;
    } else {
        scale = winWidth / refWidth;
    }

    mainRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
};

const Display = () => {
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
        <div id="main" ref={mainRef} className="relative top-2/4 left-2/4 overflow-hidden w-[1440px] h-[1080px] will-change-transform">
            <Image
                className="block max-h-full max-w-full"
                src="/images/template-4k.png"
                layout="fill"
            />
        </div>
    )
};

export default Display;
