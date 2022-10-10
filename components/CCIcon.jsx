import * as React from "react";
import { getIcon } from "../hooks/useIconMap";

const CCIcon = ({ iconCode, windData }) => {
    const [icon, setIcon] = React.useState(19);

    React.useEffect(() => {
        if (typeof iconCode === "number" && typeof windData === "number") {
            const mapped = getIcon(iconCode, windData);
            setIcon(mapped);
        }
    }, [iconCode, windData]);

    return (
        <div
            id="conditions-icon"
            className="absolute left-conditions-icon-l bg-conditions-icon w-conditions-icon h-conditions-icon bg-no-repeat top-conditions-icon-t z-0"
            style={{ backgroundImage: `url(images/icons2010/${icon}.png)` }}
        />
    );
};

export default CCIcon;
