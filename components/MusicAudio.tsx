import * as React from "react";
import {
  MdPlayArrow,
  MdPause,
  MdReplay10,
  MdForward10,
  MdRepeatOne,
  MdRepeatOneOn
} from "react-icons/md";

import { useSyncExternalStore } from "react";
import { audioStore } from "../hooks/audioStore";

export const useFirstClick = () =>
  useSyncExternalStore(
    audioStore.subscribe,
    audioStore.get,
    audioStore.get
  );

const randNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

interface MusicAudioProps {
  vol: number;
}

const MusicAudio = ({ vol }: MusicAudioProps) => {
  const firstClick = useFirstClick();
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [fileIdx, setFileIdx] = React.useState(randNum(1, 33));
  const [loop, setLoop] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const src = React.useMemo(() => {
    return `/music/${encodeURIComponent(
      `Weatherscan Track ${fileIdx}.mp3`
    )}`;
  }, [fileIdx]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!firstClick) return;

    audio.src = src;
    audio.volume = vol;
    audio.load();

    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [src, firstClick]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, [vol]);

  const handleEnded = () => {
    if (loop) {
      audioRef.current?.play();
      return;
    }

    let rand = randNum(1, 33);
    while (rand === fileIdx) rand = randNum(1, 33);

    setFileIdx(rand);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  };

  return (
    <>
      <audio ref={audioRef} onEnded={handleEnded} />

      <div className="fixed right-2 bottom-2 flex flex-row z-audio bg-dark opacity-50 rounded-xl">
        <button onClick={skipBackward}>
          <MdReplay10 className="text-white p-2 w-[36px] h-[36px]" />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <MdPause className="text-white p-2 w-[36px] h-[36px]" />
          ) : (
            <MdPlayArrow className="text-white p-2 w-[36px] h-[36px]" />
          )}
        </button>

        <button onClick={skipForward}>
          <MdForward10 className="text-white p-2 w-[36px] h-[36px]" />
        </button>

        <button onClick={() => setLoop((p) => !p)}>
          {loop ? (
            <MdRepeatOneOn className="text-white p-2 w-[36px] h-[36px]" />
          ) : (
            <MdRepeatOne className="text-white p-2 w-[36px] h-[36px]" />
          )}
        </button>
      </div>
    </>
  );
};

export default MusicAudio;
