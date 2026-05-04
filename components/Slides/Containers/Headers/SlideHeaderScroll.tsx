import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { getWidth } from "../../../../hooks/useCalc";

interface ItemRef {
    city?: HTMLElement
    arrow?: HTMLElement
}

interface ItemsRef {
    [idx: number]: ItemRef
}

interface SlideHeaderScrollProps {
    locations: string[]
    willUpdate: boolean
    startCallback?: (toSelect: string) => void
    finishCallback?: (selected: string) => void
}

const SlideHeaderScroll = ({ locations, willUpdate, startCallback, finishCallback }: SlideHeaderScrollProps) => {
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const [list, setList] = React.useState<string[]>(locations);
    const itemsRef = React.useRef<ItemsRef>([]);
    const controls = useAnimation();
    const cityControls = useAnimation();

    React.useEffect(() => {
        if (!loaded && itemsRef.current) {
            // @ts-ignore
            while (itemsRef.current.length > 0) {
                // @ts-ignore
                itemsRef.current.pop();
            }
            for (let i = 0; i < list.length; i++) {
                itemsRef.current[i] = { city: null, arrow: null };
            }
            setLoaded(true);
        }
    }, [loaded, itemsRef, list]);

    React.useEffect(() => {
        if (willUpdate && itemsRef.current) {
            const items = itemsRef.current;
            const current = items[0];

            if (current.city && current.arrow) {
                const cityRefWidth = getWidth(current.city, "full");
                const arrowRefWidth = getWidth(current.arrow, "full");

                items[1].city.classList.remove("opacity-half");
                startCallback(items[1].city.innerHTML);

                controls.start({
                    left: `${-1.06*(cityRefWidth + arrowRefWidth)}px`,
                    transition: { duration: 0.9 }
                }).then(() => {
                    items[1].city.classList.add("opacity-half");
                    finishCallback(items[1].city.innerHTML);
                    setList((prevList) => {
                        const [first, ...rest] = prevList;
                        return [...rest, first];
                    });
                    controls.set({ left: null });
                });
            }
        }
    }, [willUpdate, itemsRef]);

    // itemsRef.current[`${idx}_city`] = cityRef
    // itemsRef.current[`${idx}_arrow`] = arrowRef
    return (
        <motion.div
            animate={controls}
            id="slides-header-scroll"
            className="transform scale-x-106 scale-y-100 -translate-y-1/2 relative inline-block origin-left-center top-1/2 leading-hscroller font-interstate text-hscroller"
        >
            {loaded && list.map((location, idx) => (
                <React.Fragment key={idx}>
                    <motion.span animate={cityControls} ref={(cityRef) => {
                      if (itemsRef.current[idx]) {
                        itemsRef.current[idx].city = cityRef
                      };
                    }} id="city" className={`uppercase inline-block${idx !== 0 ? " opacity-half" : ""}`}>{location}</motion.span>
                    {idx !== (list.length - 1) &&
                        <motion.span ref={(arrowRef) => {
                          if (itemsRef.current[idx]) {
                            itemsRef.current[idx].arrow = arrowRef
                          };
                        }} id="divider-arrow" className="opacity-half text-divider-arrow inline-block transform scale-x-1 scale-y-105 translate-x-0 -translate-y-2.5 origin-left-center font-bold pl-[7px] pr-[7px] font-zemestro-std">&lt;</motion.span>
                    }
                </React.Fragment>
            ))}
        </motion.div>
    );
};

export default SlideHeaderScroll;
