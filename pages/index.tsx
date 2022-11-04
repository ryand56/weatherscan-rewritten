import * as React from "react";
import { useRouter } from "next/router";

import { AudioPlayerProvider } from "react-use-audio-player";
import MusicAudio from "../components/MusicAudio";

import Intro from "../components/Intro";
import Display from "../components/Display";

import { useWinSizeInner } from "../hooks/useWinSize";

const Index = () => {
    const { isReady, query } = useRouter();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [location, setLocation] = React.useState<string>("");
    const [language, setLanguage] = React.useState<string>("en-US");
    const [innerWidth, innerHeight] = useWinSizeInner();
    const [introDone, setIntroDone] = React.useState<boolean>(false);

    const [musicVol, setMusicVol] = React.useState<number>(1);

    const IntroCallback = () => {
        setIntroDone(true);
    };

    React.useEffect(() => {
        if (!isReady) return;
        const location = query.location as string;
        const language = query.language as string;

        // Custom location
        if (location !== undefined && location !== null) {
            setLocation(location);
        }

        // Custom language
        if (language !== undefined && language !== null) {
            setLanguage(language);
        }

        setLoading(false);
    }, [isReady]);

    if (loading) return <div>Loading...</div>;

    /*
        <AudioPlayerProvider>
            <MusicAudio vol={musicVol} />
        </AudioPlayerProvider>
    */
    return (
        <>
            <Intro winSize={[innerWidth, innerHeight]} callback={IntroCallback} />
            <Display
                isReady={introDone}
                winSize={[innerWidth, innerHeight]}
                location={location}
                language={language}
                setMainVol={setMusicVol}
            />
        </>
    );
};

export default Index;
