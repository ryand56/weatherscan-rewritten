import * as React from "react";
import type { ExtraInfo } from "../../../../../../../hooks/useWeather";

import SlideContainerHeader from "../../../../Headers/SlideContainerHeader";

const Header = React.lazy(() => import(
    "./Header" /* webpackChunkName: "cSlideExtendedHeader" */
));
const Weekday = React.lazy(() => import(
    "./Weekday" /* webpackChunkName: "cSlideExtendedWeekday" */
));
const Linebreak = React.lazy(() => import(
    "./Linebreak" /* webpackChunkName: "cSlideExtendedLinebreak" */
));

interface ExtendedProps {
    info?: ExtraInfo
}

// Extended forecasts
const Extended = ({ info }: ExtendedProps) => (
    <>
        <SlideContainerHeader>Extended Forecast</SlideContainerHeader>
        <Header days={[
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri"
        ]} />
    </>
);

export default Extended;
