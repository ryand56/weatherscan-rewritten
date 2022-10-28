import * as React from "react";
import { useAudioPlayer } from "react-use-audio-player";

export const enum VocalMale {}

export const enum VocalFemale {
    RADAR = "/vocals/female/The_local_Doppler_radar.mp3",
    CURRENT_COND = "/vocals/female/Your_current_conditions.mp3",
    LOCAL_FORECAST_1 = "/vocals/female/Your_local_forecast_1.mp3",
    LOCAL_FORECAST_2 = "/vocals/female/Your_local_forecast_2.mp3"
}

interface VocalProps {
    vocal?: VocalMale | VocalFemale
    setMainVol: React.Dispatch<React.SetStateAction<number>>
}

const VocalAudio = ({ vocal, setMainVol }: VocalProps) => {
    const { load } = useAudioPlayer();

    React.useEffect(() => {
        if (vocal) {
            load({
                src: vocal,
                autoplay: true,
                onplay: () => setMainVol(0.25),
                onend: () => setMainVol(1)
            });
        }
    }, [vocal]);

    return null;
};

export default VocalAudio;
