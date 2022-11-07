import * as React from "react";
import type { SlideProps } from "../../../../../../hooks/useSlides";
import { SlideshowReducer, Slides, ActionType } from "../../../../../../hooks/useSlides";
import { motion, AnimatePresence } from "framer-motion";
import Forecast from "./Forecast";
import Detailed from "./Detailed";

const SlideCityInfo = ({ next, location, currentCityInfo }: SlideProps) => {
    const [slideState, slideDispatch] = React.useReducer(SlideshowReducer, { index: 0 });

    const currentSlide = React.useMemo(() => {
        console.log("Rendering new city info slide");
        switch (slideState.index) {
            case 0:
                return <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    key="noreport"
                    id="noreport"
                    className="transform translate-x-0 translate-y-60px scale-x-114-5 scale-y-100 origin-left absolute whitespace-nowrap font-frutiger57-cond pt-noreport-t pl-noreport-l text-white text-noreport text-shadow z-noreport"
                >No Report</motion.div>;
            case 1:
                return <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    key="tempunavailable"
                    id="tempunavailable"
                    className="transform translate-x-0 translate-y-60px scale-x-114-5 scale-y-100 origin-left absolute whitespace-nowrap font-frutiger57-cond pt-noreport-t pl-tempunavailable-l text-white text-tempunavailable text-shadow z-noreport"
                >Temporarily Unavailable</motion.div>;
            case 2:
                return <Detailed city={location} info={currentCityInfo} />;
            default:
                return null;
        }
    }, [slideState.index]);

    React.useEffect(() => {
        let timeout = setTimeout(() => {
            slideDispatch({ type: ActionType.INCREASE, payload: 1 });
            if (slideState.index >= 2) setTimeout(next, 800);
        }, 8000);
        return () => clearTimeout(timeout);
    }, [slideState.index]);

    return (
        <div
            id="city-info-slide"
            className="relative bg-city-info-slide bg-no-repeat w-full min-h-infoslide max-h-infoslide overflow-hidden flex flex-col"
        >
            <AnimatePresence mode="wait">
                {currentSlide}
            </AnimatePresence>
        </div>
    );
};

export default SlideCityInfo;
