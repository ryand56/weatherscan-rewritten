import * as React from "react";
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

const globalAudio = typeof window !== "undefined" ? new Audio() : null;

// Create a persistent volume reset mechanism
let globalSetMainVol: ((v: number) => void) | null = null;

if (globalAudio) {
  globalAudio.addEventListener("ended", () => {
    if (globalSetMainVol) globalSetMainVol(1);
  });
  globalAudio.addEventListener("error", () => {
    if (globalSetMainVol) globalSetMainVol(1);
  });
}

const VocalAudio = ({ vocal, setMainVol }: VocalProps) => {
  const firstClick = useFirstClick();
  const lastVocalRef = React.useRef<string | undefined>(undefined);

  // Keep the global setter in sync with the current setMainVol prop
  React.useEffect(() => {
    globalSetMainVol = setMainVol;
  }, [setMainVol]);

  React.useEffect(() => {
    if (!globalAudio || !firstClick) return;

    if (!vocal) {
      if (globalAudio.paused || globalAudio.ended) {
        setMainVol(1);
      }
      lastVocalRef.current = undefined;
      return;
    }

    if (vocal === lastVocalRef.current) return;

    const audio = globalAudio;

    setMainVol(0.25);
    
    lastVocalRef.current = vocal;
    audio.src = vocal;
    audio.play().catch((err) => {
      console.warn("Playback interrupted:", err);
      setMainVol(1);
    });

    return () => { };
  }, [vocal, firstClick, setMainVol]);

  return null;
};

export default VocalAudio;
