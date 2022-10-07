import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.2.0/dist/leaflet.css" integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ==" crossorigin="" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet-timedimension@1.1.1/dist/leaflet.timedimension.control.min.css" />
                <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maplibre-gl@2.1.7/dist/maplibre-gl.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
                <Script
                    src="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js"
                    strategy="beforeInteractive"
                />
                <Script
                    src="https://cdn.jsdelivr.net/npm/maplibre-gl@2.1.7/dist/maplibre-gl.js"
                    strategy="beforeInteractive"
                />
                <Script
                    src="https://cdn.jsdelivr.net/npm/leaflet@1.2.0/dist/leaflet.js"
                    integrity="sha512-lInM/apFSqyy1o6s89K4iQUKg6ppXEgsVxT35HbzUupEVRh2Eu9Wdl4tHj7dZO0s1uvplcYGmt3498TtHq+log=="
                    crossOrigin=""
                    strategy="afterInteractive"
                />
                <Script
                    type="text/javascript"
                    src="https://cdn.jsdelivr.net/npm/iso8601-js-period@0.2.1/iso8601.min.js"
                    strategy="afterInteractive"
                />
                <Script
                    type="text/javascript"
                    src="https://cdn.jsdelivr.net/npm/leaflet-timedimension@1.1.1/dist/leaflet.timedimension.min.js"
                    strategy="afterInteractive"
                />
                <Script
                    type="text/javascript"
                    src="https://cdn.jsdelivr.net/npm/leaflet.nontiledlayer@latest/dist/NonTiledLayer-src.js"
                    strategy="afterInteractive"
                />
            </body>
        </Html>
    );
};