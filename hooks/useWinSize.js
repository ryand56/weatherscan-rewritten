import * as React from "react";

export const useWinSizeInner = () => {
    const [size, setSize] = React.useState([0, 0]);
    React.useEffect(() => {
        let resizeTimer;
        const updateSize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setSize([window.innerWidth, window.innerHeight]);
            }, 100);
        };
        
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => {
            window.removeEventListener("resize", updateSize);
            clearTimeout(resizeTimer);
        };
    }, []);
    
    return size;
};

export const useWinSizeOuter = () => {
    const [size, setSize] = React.useState([0, 0]);
    React.useEffect(() => {
        let resizeTimer;
        const updateSize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setSize([window.outerWidth, window.outerHeight]);
            }, 100);
        };
        
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => {
            window.removeEventListener("resize", updateSize);
            clearTimeout(resizeTimer);
        };
    }, []);
    
    return size;
};