import * as React from "react";
import type { Location, ExtraInfo, CurrentCond } from "../../../hooks/useWeather";
import SlideHeader from "./Headers/SlideHeader";
import { AudioPlayerProvider } from "react-use-audio-player";
import { VocalMale, VocalFemale } from "../../../components/VocalAudio";
import VocalAudio from "../../../components/VocalAudio";

import { SlideshowReducer, Slides, ActionType } from "../../../hooks/useSlides";

import City from "./Slides/City";
import Health from "./Slides/Health";
import Travel from "./Slides/Travel";
import Airports from "./Slides/Airports";
import International from "./Slides/International";

interface SlidesContainerProps {
    setMainVol: React.Dispatch<React.SetStateAction<number>>
    locInfo?: Partial<Location>
    mainCityInfo?: ExtraInfo
    extraCityInfo?: Map<string, ExtraInfo>
    introLoaded: boolean
    setIntroLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const SlidesContainer = ({ setMainVol, locInfo, mainCityInfo, extraCityInfo, introLoaded, setIntroLoaded }: SlidesContainerProps) => {    
    const [slideState, slideDispatch] = React.useReducer(SlideshowReducer, { index: 0, isCity: true });
    const [vocal, setVocal] = React.useState<VocalMale | VocalFemale>(null);
    const [headerWillUpdate, setHeaderUpdate] = React.useState<boolean>(false);

    const SetVocalDebounce = (vocal: VocalMale | VocalFemale) : Promise<void> => {
        return new Promise(resolve => {
            setVocal(vocal);
            setTimeout(() => {
                setVocal(null);
                resolve();
            }, 500);
        });
    };

    const [cityInfo, setCityInfo] = React.useState<Map<string, ExtraInfo>>(extraCityInfo);
    const [currentCity, setCurrentCity] = React.useState<string>(locInfo.city);
    const [currentInfo, setCurrentInfo] = React.useState<ExtraInfo>(mainCityInfo);
    const [header, setHeader] = React.useState<string[]>([]);

    const SlideCallback = React.useCallback(() => setHeaderUpdate(true), [slideState.index]);

    const HeaderStartCallback = (toSelect: string) => {
        //const introNeeded = locInfo.city === toSelect;
        //console.log(introNeeded);
        //setIntroNeeded(introNeeded);
    };

    const HeaderFinishCallback = (selected: string) => {
        console.log("Header cycle complete");
        console.log(selected);
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
        if (currentCity && currentInfo) {
            console.log("Rendering new slide");
            switch (slideState.index) {
                case Slides.CITY:
                    return <City
                        next={SlideCallback}
                        location={currentCity}
                        currentCityInfo={currentInfo}
                        isLoaded={introLoaded}
                        setLoaded={setIntroLoaded}
                        setVocal={SetVocalDebounce}
                    />;
                case Slides.HEALTH:
                    return <Health next={SlideCallback} />;
                case Slides.TRAVEL:
                    return <Travel next={SlideCallback} />;
                case Slides.AIRPORTS:
                    return <Airports next={SlideCallback} />;
                case Slides.INTERNATIONAL:
                    return <International next={SlideCallback} />;
                default:
                    return null;
            }
        }

        return null;
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
                startCallback={HeaderStartCallback}
                finishCallback={HeaderFinishCallback}
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
