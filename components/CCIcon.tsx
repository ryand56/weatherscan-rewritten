import * as React from "react";
import { Icons2010, getIcon } from "../hooks/useIconMap";

interface CCIconProps {
    iconCode: number
    windData: number
}

const CCIcon = ({ iconCode = 44, windData = 0 }: CCIconProps) => {
    const icon = getIcon(iconCode, windData);

    return (
        <div
            id="conditions-icon"
            className="absolute left-conditions-icon-l bg-conditions-icon w-conditions-icon h-conditions-icon bg-no-repeat top-conditions-icon-t z-0"
            style={{ backgroundImage: `url(images/icons2010/${icon < 10 ? `0${icon}` : icon}.png)` }}
        />
    );
};

export default CCIcon;
