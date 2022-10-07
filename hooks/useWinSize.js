import * as React from "react";

export const useWinSizeInner = () => {
    const [size, setSize] = React.useState([0, 0]);
    React.useEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
        
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    
    return size;
};

export const useWinSizeOuter = () => {
    const [size, setSize] = React.useState([0, 0]);
    React.useEffect(() => {
        const updateSize = () => {
            setSize([window.outerWidth, window.outerHeight]);
        };
        
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    
    return size;
};