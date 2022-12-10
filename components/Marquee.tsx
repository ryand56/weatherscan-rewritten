import * as React from "react";
import Marquee from "./CustomMarquee";

/*
    #marquee1 {
        position: absolute;
        color: #DDDDDD;
        left: 32%;
        top: 900px;
        width: 68.507%;
        height: 43px;
        font-size: 33px;
        letter-spacing: .5px;
        text-shadow: 2px 2px 2px #000;
        transform: scale(112%, 100%);
        transform-origin: left;
    }
    #marquee2 {
        color: #171717;
        position: absolute;
        left: 31.35%;
        top: 87.2%;
        width: 68.507%;
        height: 5%;
        font-size: 41.5px;
        font-weight: 400;
        padding-top: .52%;
        font-stretch: expanded;
        transform: scale(110%, 100%);
        transform-origin: left;
        filter: drop-shadow(.5px 0 0 #171717);
    }
*/

interface InfoMarqueeSection {
    text: string
    duration?: number
}

interface InfoMarqueeProps {
    top: InfoMarqueeSection
    bottom: InfoMarqueeSection
}

const InfoMarquee = ({ top, bottom }: InfoMarqueeProps) => (
    <div className="absolute left-[31.35%] top-[82.5%] w-full flex flex-col">
        <Marquee play={true} gradient={false} duration={top.duration ?? 5} pauseOnHover={true}>
            <span className="text-marquee-top text-shadow-sm origin-left">{top.text}</span>
        </Marquee>
        <Marquee play={true} gradient={false} duration={bottom.duration ?? 15} pauseOnHover={true}>
            <span className="text-marquee-bottom font-normal origin-left">{bottom.text}</span>
        </Marquee>
    </div>
);

export default InfoMarquee;
