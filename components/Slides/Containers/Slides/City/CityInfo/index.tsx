import * as React from "react";
import type { SlideProps } from "../../../../../../hooks/useSlides";
import { SlideshowReducer, Slides, ActionType } from "../../../../../../hooks/useSlides";
import { VocalMale, VocalFemale } from "../../../../../VocalAudio";
import { motion, AnimatePresence } from "framer-motion";
import NoReport from "./NoReport";
import Unavailable from "./Unavailable";
import Detailed from "./Detailed";
import Near from "./Near";

const SlideCityInfo = ({ next, location, currentCityInfo, setVocal }: SlideProps) => {
    const [slideState, slideDispatch] = React.useReducer(SlideshowReducer, { index: 0 });

    const currentSlide = React.useMemo(() => {
        console.log("Rendering new city info slide");
        switch (slideState.index) {
            case 0:
                return <NoReport />;
            case 1:
                return <Unavailable />;
            case 2:
                return <Detailed
                    info={currentCityInfo}
                    setVocal={setVocal}
                />;
            default:
                return null;
        }
    }, [slideState.index]);

    React.useEffect(() => {
        let timeout = setTimeout(() => {
            slideDispatch({ type: ActionType.INCREASE, payload: 1 });
            if (slideState.index >= 2) setTimeout(() => {
                next();
                slideDispatch({ type: ActionType.SET, payload: 0 });
            }, 800);
        }, 8000);
        return () => clearTimeout(timeout);
    }, [slideState.index]);

    return (
        <div
            id="city-info-slide"
            className="relative bg-city-info-slide bg-no-repeat w-full min-h-infoslide max-h-infoslide overflow-hidden flex flex-col"
        >
            <AnimatePresence>
                {currentSlide}
            </AnimatePresence>
        </div>
    );
};

export default SlideCityInfo;
