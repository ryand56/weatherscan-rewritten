import * as React from "react";
import SlideHeader from "./Headers/SlideHeader";
import SlideSevereHeader from "./Headers/SlideSevereHeader";
import SlideSevereHeaderMsg from "./Headers/SlideSevereHeadMsg";
import { AudioPlayerProvider } from "react-use-audio-player";
import { VocalMale, VocalFemale } from "../../../components/VocalAudio";
import VocalAudio from "../../../components/VocalAudio";

import SlideBulletin from "./Slides/SlideBulletin";

interface SlidesContainerProps {
    setMainVol: React.Dispatch<React.SetStateAction<number>>
}

const SlidesContainer = ({ setMainVol }: SlidesContainerProps) => {
    // Slideshow goes here

    // <SlideCityInfo />
    
    const [vocal, setVocal] = React.useState<VocalMale | VocalFemale>(VocalFemale.CURRENT_COND);

    return (
        <div id="info-slides-container" className="flex flex-col absolute right-[75px] top-[92px] w-[887px] h-[569px] max-h-[569px] z-[1] p-slides">
            <SlideHeader />
            <SlideSevereHeader />
            <SlideSevereHeaderMsg />
            <div id="info-slide-container" className="flex-1 max-h-[522px]">
                <AudioPlayerProvider>
                    <VocalAudio vocal={vocal} setMainVol={setMainVol} />
                </AudioPlayerProvider>
            </div>
        </div>
    );
};

export default SlidesContainer;
