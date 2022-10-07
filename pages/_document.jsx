import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maplibre-gl@2.1.7/dist/maplibre-gl.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};