import * as React from "react";
import type { Location, CurrentCond } from "../../../hooks/useWeather";
import SlideHeader from "./Headers/SlideHeader";
import { AudioPlayerProvider } from "react-use-audio-player";
import { VocalMale, VocalFemale } from "../../../components/VocalAudio";
import VocalAudio from "../../../components/VocalAudio";

import { SlideshowReducer, Slides, ActionType } from "../../../hooks/useSlides";
import City from "./Slides/City";

interface SlidesContainerProps {
    setMainVol: React.Dispatch<React.SetStateAction<number>>
    locInfo?: Partial<Location>
    mainCityInfo?: Partial<CurrentCond>
    extraCityInfo?: Map<string, Partial<CurrentCond>>
}

const SlidesContainer = ({ setMainVol, locInfo, mainCityInfo, extraCityInfo }: SlidesContainerProps) => {    
    const [slideState, slideDispatch] = React.useReducer(SlideshowReducer, { index: 0, isCity: true });
    const [vocal, setVocal] = React.useState<VocalMale | VocalFemale>(VocalFemale.CURRENT_COND);
    const [headerWillUpdate, setHeaderUpdate] = React.useState<boolean>(false);

    const [cityInfo, setCityInfo] = React.useState<Map<string, Partial<CurrentCond>>>(extraCityInfo);
    const [currentCity, setCurrentCity] = React.useState<string>(locInfo.city);
    const [currentInfo, setCurrentInfo] = React.useState<Partial<CurrentCond>>(mainCityInfo);
    const [header, setHeader] = React.useState<string[]>([]);

    const SlideCallback = React.useCallback(() => setHeaderUpdate(true), [slideState.index]);

    const HeaderCallback = (selected: string) => {
        console.log("Header cycle complete");
        const selectedInfo = cityInfo.get(selected);
        if (selectedInfo !== undefined) {
            setCurrentCity(selected);
            setCurrentInfo(selectedInfo);
            slideDispatch({ type: ActionType.SET, payload: 0, payloadCity: true });
        } else {
            slideDispatch({ type: ActionType.SET_CITY, payloadCity: false });
            slideDispatch({ type: ActionType.INCREASE, payload: 1 });
        }
        setHeaderUpdate(false);
    };

    React.useEffect(() => {
        setHeader(Array.from(cityInfo.keys()));
    }, [cityInfo]);

    const currentSlide = React.useMemo(() => {
        console.log("Rendering new slide");
        switch (slideState.index) {
            case Slides.CITY:
                return <City
                    next={SlideCallback}
                    location={currentCity}
                    currentCityInfo={currentInfo}
                />;
            default:
                return null;
        }
    }, [slideState.index, SlideCallback, currentCity, currentInfo]);

    return (
        <div id="info-slides-container" className="flex flex-col absolute right-infoslides-container-r top-infoslides-container-t w-infoslides-container h-infoslides-container max-h-infoslides-container z-[1] p-slides">
            {(cityInfo && header.length > 0) && <SlideHeader
                locations={[
                    locInfo.city,
                    "Health",
                    "Travel",
                    ...header,
                    "Airports",
                    "International",
                    ...header.slice().reverse()
                ]}
                willUpdate={headerWillUpdate}
                cycleCallback={HeaderCallback}
            />}
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
