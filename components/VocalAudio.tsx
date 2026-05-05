import * as React from "react";
import VocalEngine from "./VocalEngine";
import { useFirstClick } from "./MusicAudio";

export const enum VocalFemale {
  RADAR = "/vocals/female/The_local_Doppler_radar.mp3",
  CURRENT_COND = "/vocals/female/Your_current_conditions.mp3",
  LOCAL_FORECAST_1 = "/vocals/female/Your_local_forecast_1.mp3",
  LOCAL_FORECAST_2 = "/vocals/female/Your_local_forecast_2.mp3"
}

interface VocalProps {
  vocal?: VocalFemale;
  setMainVol: React.Dispatch<React.SetStateAction<number>>;
}

const engine = new VocalEngine();

const VocalAudio = ({ vocal, setMainVol }: VocalProps) => {
  const firstClick = useFirstClick();

  React.useEffect(() => {
    if (!firstClick || !vocal) return;
    engine.play(vocal, setMainVol);
  }, [vocal, firstClick, setMainVol]);

  return null;
};

export default VocalAudio;
