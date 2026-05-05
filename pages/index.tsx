import * as React from "react";
import { useRouter } from "next/router";
import { TemperatureUnit } from "../hooks/useWeather";

import MusicAudio from "../components/MusicAudio";

import Intro from "../components/Intro";
import Display from "../components/Display";

import { useWinSizeInner } from "../hooks/useWinSize";
import { audioStore } from "../hooks/audioStore";

const Index = () => {
    const { isReady, query } = useRouter();

    const [location, setLocation] = React.useState<string>("");
    const [language, setLanguage] = React.useState<string>("en-US");
    const [units, setUnits] = React.useState<TemperatureUnit>(TemperatureUnit.METRIC_SI);
    const [muteSevere, setMuteSevere] = React.useState<boolean>(false);

    const [innerWidth, innerHeight] = useWinSizeInner();
    const [introDone, setIntroDone] = React.useState<boolean>(false);

    const [musicVol, setMusicVol] = React.useState<number>(1);

    const IntroCallback = () => {
        setIntroDone(true);
    };

    const HandleFirstClick = () => {
      audioStore.set(true);
    };

    const qLocation = query.location as string;
    const qLanguage = query.language as string;
    const qUnits = query.units as TemperatureUnit;
    const qMuteSevere = query.muteSevere as string;

    // Custom location
    if (qLocation !== undefined && qLocation !== null) {
        setLocation(qLocation);
    }

    // Custom language
    if (qLanguage !== undefined && qLanguage !== null) {
        setLanguage(qLanguage);
    }

    // Custom units
    if (qUnits !== undefined && qUnits !== null) {
        setUnits(qUnits);
    }

    // Mute severe marquees
    if (qMuteSevere !== undefined && qMuteSevere !== null) {
        setMuteSevere(Boolean(qMuteSevere));
    }

    if (!isReady) return <div>Loading...</div>;

    return (
        <div onClick={HandleFirstClick} style={{ display: 'contents' }}>
            <MusicAudio vol={musicVol} />
            <Intro winSize={[innerWidth, innerHeight]} callback={IntroCallback} />
            <Display
                isReady={introDone}
                debug={
                    process.env.NODE_ENV === "development"
                    || process.env.NODE_ENV === "test"
                }
                winSize={[innerWidth, innerHeight]}
                location={location}
                language={language}
                units={units}
                muteSevere={muteSevere}
                setMainVol={setMusicVol}
            />
        </div>
    );
};

export default Index;
