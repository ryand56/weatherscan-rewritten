import * as React from "react";

interface SlideHeaderScrollProps {
    locations: string[]
}

const SlideHeaderScroll = ({ locations }: SlideHeaderScrollProps) => (
    <>
        <div
            className="transform scale-x-106 scale-y-100 -translate-y-1/2 relative inline-block origin-left-center top-1/2 leading-hscroller font-interstate text-hscroller"
        >
            {locations.map((location, idx) => (
                <React.Fragment key={idx}>
                    <span id="city" className={idx !== 0 ? "opacity-half" : null}>{location}</span>
                    {idx !== (locations.length - 1) &&
                        <span id="divider-arrow" className="opacity-half text-divider-arrow inline-block transform scale-x-1 scale-y-105 translate-x-0 -translate-y-2.5 origin-left-center font-bold pl-[7px] pr-[7px] font-zemestro-std">&lt;</span>
                    }
                </React.Fragment>
            ))}
        </div>
    </>
);

export default SlideHeaderScroll;
