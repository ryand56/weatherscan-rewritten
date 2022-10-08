import * as React from "react";

const SlideSevereCityInfo = () => (
    <>
        <div
            id="info-slide_severe-city-info"
            className="relative bg-infoslide-color bg-severe-city-info-image bg-infoslide-pos bg-infoslide-size bg-no-repeat w-full min-h-infoslide max-h-infoslide overflow-hidden flex flex-col"
        >
            <div id="info-subheader" className="pr-slidehead-severe-city-info-r font-frutiger57-cond flex flex-row flex-nowrap justify-between text-subhead h-subhead z-subheader drop-shadow-subhead leading-subheader relative text-white w-full p-slidehead">
                <span
                    id="subhead-titlei"
                    className="absolute top-2/4"
                    style={{ transform: "translateY(-42.5%)" }}
                />
                <span
                    id="subhead-city"
                    className="font-frutiger text-subhead-city pt-0 origin-right right-subhead-city-r absolute top-2/4"
                    style={{
                        transform: "translateY(-43.5%) scale(105.9%, 100%)",
                        fontStretch: "semi-expanded"
                    }}
                />
            </div>
            <div id="info-subheadershadowfix" className="font-frutiger57-cond text-white flex flex-row flex-nowrap justify-between text-subhead h-subhead z-subheader-shadow whitespace-nowrap drop-shadow-subhead absolute min-w-subhead-shadow">
                <span
                    id="subhead-title"
                    className="absolute top-subhead-shadow-t origin-left left-subhead-shadow-l w-subhead-shadow"
                    style={{ transform: "translateY(-42.5%) scale(118%, 100%)" }}
                >Severe Weather Message</span>
            </div>
            <div
                id="noreport"
                className="origin-left absolute whitespace-nowrap font-frutiger57-cond pt-noreport-t pl-noreport-l text-white text-noreport drop-shadow-default z-noreport"
            >
                No Report
            </div>
        </div>
    </>
);

export default SlideSevereCityInfo;
