import "../styles/global.css";
import * as React from "react";
import Head from "next/head";

const MyApp = ({ Component, pageProps, router }) => (
    <>
        <Head>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <title>Weatherscan</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <Component {...pageProps} key={router.pathname} />
    </>
);

export default MyApp;
