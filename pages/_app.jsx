import "../styles/global.css";
import * as React from "react";
import Head from "next/head";

import { useWinSizeInner, useWinSizeOuter } from "../hooks/useWinSize";

const MyApp = ({ Component, pageProps, router }) => {
    const [innerWidth, innerHeight] = useWinSizeInner();
    const [outerWidth, outerHeight] = useWinSizeOuter();

    const mainRef = React.useRef();

    React.useEffect(() => {
        if (typeof window === undefined) {
            return;
        }

        window.addEventListener("resize", (e) => {
            let scale, windowAspect;

            windowAspect = innerWidth / innerHeight;

            if (windowAspect >= 4/3) {
                scale = innerHeight / outerHeight;
            } else {
                scale = innerWidth / outerWidth;
            }

            if (mainRef.current)
                mainRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        });
    }, [innerWidth, innerHeight, outerWidth, outerHeight, mainRef]);

    return (
        <>
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Weatherscan</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <div ref={mainRef} className="relative top-1/2 left-1/2 overflow-hidden w-[1440px] h-[1080px] will-change-transform">
                <Component {...pageProps} key={router.pathname} />
            </div>
        </>
    );
};

export default MyApp;
