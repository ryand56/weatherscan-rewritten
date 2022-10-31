import * as React from "react";
import type { SlideProps } from "../../../../../hooks/useSlides";
import { SlideshowReducer, Slides, ActionType } from "../../../../../hooks/useSlides";
import { motion, AnimatePresence } from "framer-motion";
import Forecast from "./Forecast";

const SlideCityInfo = ({ next }: SlideProps) => {
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
            default:
                return null;
        }
    }, [slideState.index]);

    React.useEffect(() => {
        let timeout = setTimeout(() => {
            if (slideState.index >= 1) {
                next();
            } else {
                slideDispatch({ type: ActionType.INCREASE, payload: 1 });
            }
        }, 8000);
        return () => clearTimeout(timeout);
    }, [slideState.index]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            id="city-info-slide"
            className="relative bg-city-info-slide bg-no-repeat w-full min-h-infoslide max-h-infoslide overflow-hidden flex flex-col"
        >
            <div
                id="info-subheader"
                className="pr-subhead-city-info-r font-frutiger57-cond flex flex-row flex-nowrap justify-between text-subhead h-subhead z-subheader text-shadow-subhead leading-subheader relative text-white w-full p-slidehead"
            >
                <span id="subhead-titlei" className="absolute top-1/2 transform -translate-y-42-5" />
                <span
                    id="subhead-city"
                    className="font-frutiger text-subhead-city pt-0 transform -translate-y-43-5 scale-x-105-9 scale-y-100 origin-right right-subhead-city-r font-stretch-semi-exp"
                />
            </div>
            <div
                id="info-subheadershadowfix"
                className="font-normal font-frutiger57-cond text-white flex flex-row flex-nowrap justify-between text-subhead h-subhead z-subheader-shadow whitespace-nowrap text-shadow-subhead absolute min-w-subhead-shadow"
            />
            <AnimatePresence mode="wait">
                {currentSlide}
            </AnimatePresence>
        </motion.div>
    );
};

export default SlideCityInfo;
