import { motion } from "framer-motion";

const SlideContainerHeader = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            key="info-subheadershadowfix"
            id="info-subheadershadowfix"
            className="font-normal font-frutiger57-cond text-white flex flex-row flex-nowrap justify-between text-subhead h-subhead z-subheader-shadow whitespace-nowrap text-shadow-subhead absolute min-w-subhead-shadow"
        >
            <span id="subhead-title" className="absolute top-subhead-title-t transform -translate-y-42-5 scale-x-118 scale-y-100 origin-left left-subhead-title-l w-subhead-title">{children}</span>
        </motion.div>
    );
};

export default SlideContainerHeader;
