import * as React from "react";
import type { SlideProps } from "../../../../../hooks/useSlides";

const Travel = ({ next }: SlideProps) => {
    React.useEffect(() => {
        let timeout = setTimeout(next, 8000);
        return () => clearTimeout(timeout);
    }, []);

    return <div id="travel">Travel</div>;
};

export default Travel;
