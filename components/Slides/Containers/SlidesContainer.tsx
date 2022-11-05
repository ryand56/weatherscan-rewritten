import * as React from "react";
import type { CurrentCond } from "../../../hooks/useWeather";
import SlideHeader from "./Headers/SlideHeader";
import { AudioPlayerProvider } from "react-use-audio-player";
import { VocalMale, VocalFemale } from "../../../components/VocalAudio";
import VocalAudio from "../../../components/VocalAudio";

import { SlideshowReducer, Slides, ActionType } from "../../../hooks/useSlides";
import CityIntro from "./Slides/CityIntro";
import CityInfo from "./Slides/CityInfo";

interface SlidesContainerProps {
    setMainVol: React.Dispatch<React.SetStateAction<number>>
    currentCityInfo?: Partial<CurrentCond>
}

const SlidesContainer = ({ setMainVol, currentCityInfo }: SlidesContainerProps) => {    
    const [slideState, slideDispatch] = React.useReducer(SlideshowReducer, { index: 0 });
    const [vocal, setVocal] = React.useState<VocalMale | VocalFemale>(VocalFemale.CURRENT_COND);
    const [headerWillUpdate, setHeaderUpdate] = React.useState<boolean>(false);

    const SlideCallback = React.useCallback(() => {
        if (slideState.index >= 1) {
            slideDispatch({ type: ActionType.SET, payload: 0 });
        } else {
            slideDispatch({ type: ActionType.INCREASE, payload: 1 });
        }
        setHeaderUpdate(true);
    }, [slideState.index]);

    const HeaderCallback = () => {
        console.log("Header cycle complete");
        setHeaderUpdate(false);
    };

    const currentSlide = React.useMemo(() => {
        console.log("Rendering new slide");
        switch (slideState.index) {
            case Slides.INTRO:
                return <CityIntro next={SlideCallback} />;
            case Slides.INFO:
                return <CityInfo next={SlideCallback} currentCityInfo={currentCityInfo} />;
            default:
                return null;
        }
    }, [slideState.index]);

    return (
        <div id="info-slides-container" className="flex flex-col absolute right-infoslides-container-r top-infoslides-container-t w-infoslides-container h-infoslides-container max-h-infoslides-container z-[1] p-slides">
            <SlideHeader locations={[
                "THIS",
                "IS",
                "A",
                "TEST",
                "HELLO",
                "WORLD",
                "DEMO",
                "WEATHERSCAN",
                "SYSTEM",
                "TESTING"
            ]} willUpdate={headerWillUpdate} cycleCallback={HeaderCallback} />
            <div id="info-slide-container" className="absolute top-infoslide-container-t h-infoslide-container w-infoslide-container">
                <AudioPlayerProvider>
                    <VocalAudio vocal={vocal} setMainVol={setMainVol} />
                </AudioPlayerProvider>
                {currentSlide}
            </div>
        </div>
    );
};

export default SlidesContainer;
