import "../styles/global.scss";
import * as React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

const MyApp = ({ Component, pageProps, router }: AppProps) => (
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
