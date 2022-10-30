import * as React from "react";
import SlideHeader from "./Headers/SlideHeader";
import SlideSevereHeader from "./Headers/SlideSevereHeader";
import SlideSevereHeaderMsg from "./Headers/SlideSevereHeadMsg";
import { AudioPlayerProvider } from "react-use-audio-player";
import { VocalMale, VocalFemale } from "../../../components/VocalAudio";
import VocalAudio from "../../../components/VocalAudio";
import { AnimatePresence } from "framer-motion";

import { SlideshowReducer, Slides, ActionType } from "../../../hooks/useSlides";
import CityIntro from "./Slides/CityIntro";
import CityInfo from "./Slides/CityInfo";

interface SlidesContainerProps {
    setMainVol: React.Dispatch<React.SetStateAction<number>>
}

const SlidesContainer = ({ setMainVol }: SlidesContainerProps) => {    
    const [slideState, slideDispatch] = React.useReducer(SlideshowReducer, { index: 0 });
    const [vocal, setVocal] = React.useState<VocalMale | VocalFemale>(VocalFemale.CURRENT_COND);

    const currentSlide = React.useMemo(() => {
        console.log("Rendering new slide");
        switch (slideState.index) {
            case Slides.INTRO:
                return <CityIntro key="city-intro-slide" />;
            case Slides.INFO:
                return <CityInfo key="city-info-slide" />;
            default:
                return null;
        }
    }, [slideState.index]);

    // Test transition
    React.useEffect(() => {
        let interval = setInterval(() => {
            slideDispatch({ type: ActionType.INCREASE, payload: 1 });
        }, 12000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="info-slides-container" className="flex flex-col absolute right-infoslides-container-r top-infoslides-container-t w-infoslides-container h-infoslides-container max-h-infoslides-container z-[1] p-slides">
            <SlideHeader />
            <SlideSevereHeader />
            <SlideSevereHeaderMsg />
            <div id="info-slide-container" className="absolute top-infoslide-container-t h-infoslide-container w-infoslide-container">
                <AudioPlayerProvider>
                    <VocalAudio vocal={vocal} setMainVol={setMainVol} />
                </AudioPlayerProvider>
                <AnimatePresence mode="wait">
                    {currentSlide}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SlidesContainer;
