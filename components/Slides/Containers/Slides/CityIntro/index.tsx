import * as React from "react";
import { motion } from "framer-motion";

const CityIntro = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        id="city-intro-slide"
        className="bg-infoslide-color bg-city-intro-slide bg-no-repeat min-w-infoslide max-w-infoslide min-h-infoslide-px max-h-infoslide-px absolute top-0 overflow-hidden flex flex-col z-infoslide"
    >
        <div id="ws-copyright" className="text-white text-copyright bg-copyright h-copyright w-full absolute top-0 left-0 items-center pl-copyright-l pr-copyright-r pt-copyright-t leading-copyright z-copyright">
            <span id="ws-copyright-text" className="block transform scale-x-107 scale-y-100 origin-left text-white text-copyright leading-copyright">
                Weatherscan is brought to you by The Weather Channel&#174; and MIDCO
            </span>
        </div>
        <div id="cityaccent-i-curve" className="bg-cityaccent-yellow cityaccent-mask w-[40%] h-[128.5%] -top-[16.3%] -right-[11.2%] opacity-[.8] animate-cityaccentmovei absolute bg-curve bg-no-repeat"></div>
        <div id="cityaccent-ii-curve" className="bg-cityaccent-blue cityaccent-mask w-[55%] h-[131%] -top-[13.5%] -right-[13.75%] opacity-[.5] animate-cityaccentmoveii absolute bg-curve bg-no-repeat"></div>
        <div id="cityaccent-iii-curve" className="bg-cityaccent-yellow cityaccent-mask w-[55%] h-[172.4%] -top-[12.25%] -right-[29.75%] animate-cityaccentmoveiii absolute bg-curve bg-no-repeat"></div>
        <div id="cityaccent-iv-curve" className="bg-cityaccent-blue cityaccent-mask-min w-[67.5%] h-[202.5%] -top-[31.45%] -left-[22%] opacity-[.5] animate-cityaccentmoveiv absolute bg-curve bg-no-repeat"></div>
    </motion.div>
);

export default CityIntro;
