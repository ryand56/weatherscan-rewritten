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
                return <Detailed
                    info={currentCityInfo}
                    setVocal={setVocal}
                />;
            case 1:
                return <Near />;
            default:
                return null;
        }
    }, [slideState.index]);

    React.useEffect(() => {
        let timeout = setTimeout(() => {
            /* if (slideState.index >= 1) setTimeout(() => {
                next();
                slideDispatch({ type: ActionType.SET, payload: 0 });
            }, 800); */
            if (slideState.index >= 1) {
                console.log("Slide state index is over 1");
                next();
                slideDispatch({ type: ActionType.SET, payload: 0 });
                return;
            }

            console.log("Slide state dispatch increase");
            slideDispatch({ type: ActionType.INCREASE, payload: 1 });
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
