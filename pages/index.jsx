import * as React from "react";
import { useRouter } from "next/router";

import Intro from "../components/Intro";
import Display from "../components/Display";

import { getMainLocation, getClosestLocation } from "../hooks/useWeather";

const Index = () => {
    const router = useRouter();
    const [location, setLocation] = React.useState(null);

    React.useEffect(() => {
        const query = router.query;
        if (Object.keys(query).length > 0) {
            const location = query.location;
            if (location) {
                setLocation(location);
            }
        } else {
            /* getClosestLocation().then(data => {
                setLocation(data);
            }).catch(err => {
                console.error(err);
            }); */
        }
    }, [router]);

    return (
        <>
            <Intro />
            {location && <Display display location={location} />}
        </>
    );
};

export default Index;
