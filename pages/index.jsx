import * as React from "react";
import { useRouter } from "next/router";

import { AudioPlayerProvider } from "react-use-audio-player";
import Audio from "../components/Audio";

import Intro from "../components/Intro";
import Display from "../components/Display";

import { getMainLocation, getClosestLocation } from "../hooks/useWeather";
import { useWinSizeInner } from "../hooks/useWinSize";

const Index = () => {
    const router = useRouter(); // const { isReady, query } = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [location, setLocation] = React.useState(null);
    const [innerWidth, innerHeight] = useWinSizeInner();

    React.useEffect(() => {
        if (!router.isReady) return;
        const query = router.query;
        const location = query.location;

        // Custom location
        if (location !== undefined && location !== null) {
            setLocation(location);
        }

        setLoading(false);
    }, [router.isReady]);

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
