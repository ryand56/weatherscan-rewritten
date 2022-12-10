import * as React from "react";
import type { SlideProps } from "../../../../../hooks/useSlides";

const Health = ({ next }: SlideProps) => {
    React.useEffect(() => {
        let timeout = setTimeout(next, 8000);
        return () => clearTimeout(timeout);
    }, []);

    return <div id="health"></div>;
};

export default Health;
