import * as React from "react";
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player";
import {
  MdPlayArrow,
  MdPause,
  MdReplay10,
  MdForward10,
  MdRepeatOne,
  MdRepeatOneOn,
} from "react-icons/md";

const randNum = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

interface MusicAudioProps {
  vol: number;
}

const MusicAudio = ({ vol }: MusicAudioProps) => {
  const [fileIdx, setFileIdx] = React.useState<number>(randNum(1, 13));
  const [file, setFile] = React.useState<string>(
    `/music/${encodeURIComponent(`Weatherscan Track ${fileIdx}.mp3`)}`
  );
  const [loop, setLoop] = React.useState<boolean>(false);

  const { togglePlayPause, ready, loading, playing, load, player, volume } =
    useAudioPlayer({
      src: file,
      format: "mp3",
      autoplay: true,
      preload: true,
      onplay: () => console.log(`Playing ${file}`),
      onend: () => {
        console.log(`${file} has ended`);
        if (!loop) {
          let rand = randNum(1, 13);
          while (rand === fileIdx) {
            rand = randNum(1, 13);
          }
          setFileIdx(rand);
        }
      },
    });

  React.useEffect(() => {
    if (!player) return;
    player.loop(loop);
  }, [player, loop]);

  // Update volume
  React.useEffect(() => {
    if (!player) return;
    volume(vol);
  }, [player, volume, vol]);

  const toggleLoop = React.useCallback(() => {
    if (!player) return;

    console.log(loop ? "Loop turning off" : "Loop turning on");
    setLoop(!loop);
  }, [player, loop]);

  const { position, seek } = useAudioPosition({ highRefreshRate: true });

  const toggleSkipBackward = React.useCallback(() => {
    if (!player) return;
    seek(position - 10);
  }, [player, position]);

  const toggleSkipForward = React.useCallback(() => {
    if (!player) return;
    seek(position + 10);
  }, [player, position]);

  // File index change
  React.useEffect(() => {
    setFile(`/music/${encodeURIComponent(`Weatherscan Track ${fileIdx}.mp3`)}`);
  }, [fileIdx]);

  return (
    player && (
      <div
        id="audio"
        className="fixed right-2 bottom-2 flex flex-row flex-nowrap z-audio bg-dark opacity-50 rounded-xl"
      >
        <button onClick={toggleSkipBackward}>
          <MdReplay10 className="text-white p-2 w-[36px] h-[36px]" />
        </button>
        <button onClick={togglePlayPause}>
          {playing ? (
            <MdPause className="text-white p-2 w-[36px] h-[36px]" />
          ) : (
            <MdPlayArrow className="text-white p-2 w-[36px] h-[36px]" />
          )}
        </button>
        <button onClick={toggleSkipForward}>
          <MdForward10 className="text-white p-2 w-[36px] h-[36px]" />
        </button>
        <button onClick={toggleLoop}>
          {loop ? (
            <MdRepeatOneOn className="text-white p-2 w-[36px] h-[36px]" />
          ) : (
            <MdRepeatOne className="text-white p-2 w-[36px] h-[36px]" />
          )}
        </button>
      </div>
    )
  );
};

export default MusicAudio;
