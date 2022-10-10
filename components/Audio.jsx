import * as React from "react";
import { useAudioPlayer } from "react-use-audio-player";
import { MdPlayArrow, MdPause } from "react-icons/md";

const randNum = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const Audio = () => {
    const [fileIdx, setFileIdx] = React.useState(randNum(1, 5));
    const [file, setFile] = React.useState(`/music/${encodeURIComponent(`Weatherscan Track ${fileIdx}.mp3`)}`);

    const { togglePlayPause, ready, loading, playing, load } = useAudioPlayer({
        src: file,
        format: "mp3",
        autoplay: true,
        onplay: () => console.log(`Playing ${file}`),
        onend: () => {
            console.log(`${file} has ended`);
            let rand = randNum(1, 5);
            while (rand === fileIdx) {
                rand = randNum(1, 5);
            }
            setFileIdx(rand);
        }
    });

    // File index change
    React.useEffect(() => {
        setFile(`/music/${encodeURIComponent(`Weatherscan Track ${fileIdx}.mp3`)}`);
    }, [fileIdx]);

    return (
        <div id="audio" className="fixed right-0 bottom-0 flex flex-row flex-nowrap">
            <button onClick={togglePlayPause}>
                {playing ? <MdPause className="text-white p-2 w-[36px] h-[36px]" /> : <MdPlayArrow className="text-white p-2 w-[36px] h-[36px]" />}
            </button>
        </div>
    );
};

export default Audio;
