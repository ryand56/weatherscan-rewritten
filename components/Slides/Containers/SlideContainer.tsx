import * as React from "react";
import { AudioPlayerProvider } from "react-use-audio-player";
import { VocalMale, VocalFemale } from "../../../components/VocalAudio";
import VocalAudio from "../../../components/VocalAudio";
import SlideBulletin from "./Slides/SlideBulletin";

const SlideContainer = () => {
    // Slideshow goes here

    // <SlideCityInfo />

    const [vocal, setVocal] = React.useState<VocalMale | VocalFemale>(VocalFemale.CURRENT_COND);

    return (
        <div id="info-slide-container" className="flex-1 max-h-[522px]">
            <AudioPlayerProvider>
                <VocalAudio vocal={vocal} />
            </AudioPlayerProvider>
            <SlideBulletin />
        </div>
    );
};

export default SlideContainer;
