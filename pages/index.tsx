import * as React from "react";
import { useRouter } from "next/router";

import { AudioPlayerProvider } from "react-use-audio-player";
import Audio from "../components/Audio";

import Intro from "../components/Intro";
import Display from "../components/Display";

import { useWinSizeInner } from "../hooks/useWinSize";

const Index = () => {
    const { isReady, query } = useRouter();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [location, setLocation] = React.useState<string | string[]>("");
    const [innerWidth, innerHeight] = useWinSizeInner();

    React.useEffect(() => {
        if (!isReady) return;
        const location = query.location;

        // Custom location
        if (location !== undefined && location !== null) {
            setLocation(location);
        }

        setLoading(false);
    }, [isReady]);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <AudioPlayerProvider>
                <Audio />
            </AudioPlayerProvider>
            <Intro winSize={[innerWidth, innerHeight]} />
            <Display location={location} winSize={[innerWidth, innerHeight]} />
        </>
    );
};

export default Index;
