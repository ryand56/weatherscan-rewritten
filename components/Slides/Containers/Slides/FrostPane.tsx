import * as React from "react";

interface FrostPaneProps {
    extraParent: string[]
    children: any
}

const FrostPane = ({
    extraParent,
    children
}: FrostPaneProps) => (
    <>
        <div
            id="frost-pane"
            className={`transform translate-y-2.5 text-white font-frutiger text-frost-pane text-shadow max-h-frost-pane bg-frost-pane bg-no-repeat z-frost-pane flex-1 ${extraParent ? extraParent.join(" ") : ""}`}
        >
            {children}
        </div>
    </>
);

export default FrostPane;
