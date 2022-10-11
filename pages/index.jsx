import * as React from "react";
import { useRouter } from "next/router";

import { AudioPlayerProvider } from "react-use-audio-player";
import Audio from "../components/Audio";

import Intro from "../components/Intro";
import Display from "../components/Display";

import { getMainLocation, getClosestLocation } from "../hooks/useWeather";
import { useWinSizeInner } from "../hooks/useWinSize";

const Index = () => {
    const router = useRouter();
    const [location, setLocation] = React.useState(null);
    const [innerWidth, innerHeight] = useWinSizeInner();

    React.useEffect(() => {
        const query = router.query;
        if (Object.keys(query).length > 0) {
            const location = query.location;
            if (location) {
                setLocation(location);
            }
        } else {
            getClosestLocation().then(data => {
                setLocation(`${data.city},${data.state}`);
            }).catch(err => {
                console.error(err);
            });
        }
    }, [router]);

    return (
        location && (
            <>
                <AudioPlayerProvider>
                    <Audio />
                </AudioPlayerProvider>
                <Intro winSize={[innerWidth, innerHeight]} />
                <Display location={location} winSize={[innerWidth, innerHeight]} />
            </>
        )
    );
};

export default Index;
