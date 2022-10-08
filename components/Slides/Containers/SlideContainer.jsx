import * as React from "react";

const SlideContainer = () => (
    <>
        <div id="info-slide-container">
            <div id="info-side-bulletin" className="min-w-infoslide max-w-infoslide min-h-infoslide max-h-infoslide absolute top-0 overflow-hidden flex flex-col z-infoslide bg-bulletin-color bg-bulletin-image bg-no-repeat bg-bulletin-pos bg-bulletin-size hidden">
                <div
                    className="font-frutigerbold-cn flex flex-row flex-nowrap justify-between text-subhead-bulletin h-subhead-bulletin drop-shadow-subhead-bulletin absolute min-w-[20%] origin-left z-subheader leading-subheader text-white w-full p-slidehead"
                    style={{ transform: "scale(102.5%, 100%)" }}
                >
                    <span
                        id="subhead-titlei"
                        className="absolute top-2/4"
                        style={{ transform: "translateY(-42.5%)" }}
                    >WEATHER BULLETIN</span>
                    <span
                        id="subhead-noaa"
                        className="text-subhead-noaa font-bold right-subhead-noaa-r italic font-frutiger drop-shadow-none leading-subhead-noaa origin-right absolute top-2/4"
                        style={{
                            fontStretch: "semi-expanded",
                            transform: "scale(101%, 100%) translateY(-42.5%)"
                        }}
                    >FROM THE NATIONAL WEATHER SERVICE</span>
                </div>
                <div
                    className="bg-bulletin-frost-pane bg-no-repeat z-default mt-bulletin-frost-pane text-white text-bulletin-frost-pane drop-shadow-bulletin-frost-pane max-h-bulletin-frost-pane flex-1 hidden"
                    style={{ transform: "translate(0px, 10px)" }}
                >
                    <div
                        className="text-bulletin-cityname absolute left-bulletin-cityname-l top-bulletin-cityname-t origin-left"
                        style={{ transform: "scale(105%, 100%)" }}
                    >Frankfort Area</div>
                    <div
                        id="warningbulletin"
                        className="font-frutiger57-cond origin-left text-white text-bulletin-warnings absolute left-bulletin-warnings-l top-bulletin-warnings-t leading-bulletin-warnings pr-bulletin-warnings whitespace-pre"
                        style={{
                            transform: "scale(112.5%, 100%)",
                            fontStretch: "condensed"
                        }}
                    >
                        Flash Flood Watch in effect until 4:30 PM EST Tuesday. Monday morning.
                        <br />
                        <br />
                        Severe Thunderstorm Watch 720 in effect until 4:30 PM EST Tuesday. Monday Monday morning.
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default SlideContainer;
