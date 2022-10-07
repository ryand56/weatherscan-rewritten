import "../styles/global.css";
import * as React from "react";
import Head from "next/head";

const MyApp = ({ Component, pageProps, router }) => {
    return (
        <>
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Weatherscan</title>
            </Head>

            <div>
                <Component {...pageProps} key={router.pathname} />
            </div>
        </>
    );
};

export default MyApp;
