import * as React from "react";
import { useAudioPlayer } from "react-use-audio-player";

const randNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const Audio = () => {
    const [fileIdx, setFileIdx] = React.useState(randNum(1, 4));
    const [file, setFile] = React.useState(`/music/${encodeURIComponent(`Weatherscan Track ${fileIdx}.mp3`)}`);

    const { ready, loading, playing, load } = useAudioPlayer({
        src: file,
        format: "mp3",
        autoplay: true,
        onplay: () => console.log(`Playing ${file}`),
        onend: () => {
            let rand = randNum(1, 4);
            while (rand === fileIdx) {
                rand = randNum(1, 4);
            }
            setFileIdx(rand);
        }
    });

    // File index change
    React.useEffect(() => {
        setFile(`/music/${encodeURIComponent(`Weatherscan Track ${fileIdx}.mp3`)}`);
    }, [fileIdx]);

    return null;
};

export default Audio;
