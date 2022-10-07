import "../styles/global.css";
import * as React from "react";
import Head from "next/head";

const MyApp = ({ Component, pageProps, router }) => {
    React.useEffect(() => {
        if (typeof window === undefined) {
            return;
        }

        window.addEventListener("resize", (e) => {
            let scale, windowAspect;
            
            let innerWidth = window.innerWidth;
            let innerHeight = window.innerHeight;

            windowAspect = innerWidth / innerHeight;

            if (windowAspect >= 4/3) {
                scale = innerHeight / window.outerHeight();
            } else {
                scale = innerWidth / window.outerWidth();
            }

            document.querySelector("#main").classList.add(`scale-[${scale}]`);
        });
    }, []);

    return (
        <>
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Weatherscan</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <div id="main" className="relative top-1/2 left-1/2 overflow-hidden transform -translate-x-1/2 -translate-y-1/2 w-[1440px] h-[1080px] will-change-transform">
                <Component {...pageProps} key={router.pathname} />
            </div>
        </>
    );
};

export default MyApp;
