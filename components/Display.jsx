import * as React from "react";
import Image from "next/image";

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

const Display = () => {
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
        <div ref={mainRef} className="relative top-2/4 left-2/4 overflow-hidden w-[1440px] h-[1080px] will-change-transform">
            <Image
                src="/images/template-4k.png"
                layout="fill"
            />
        </div>
    )
};

export default Display;
