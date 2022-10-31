/*
    Remade from https://github.com/justin-chu/react-fast-marquee
    Removed the duration being affected by width of the window, unnecessary for this project
*/
import * as React from "react";
import styles from "./styles.module.scss";

interface CustomMarqueeProps {
    style?: React.CSSProperties
    className?: string
    play?: boolean
    pauseOnHover?: boolean
    pauseOnClick?: boolean
    direction?: "left" | "right"
    duration?: number
    delay?: number
    loop?: number
    gradient?: boolean
    gradientColor?: [number, number, number]
    gradientWidth?: number
    onFinish?: () => void
    onCycleComplete?: () => void
    children?: React.ReactNode
}

const CustomMarquee = ({
    style = {},
    className = "",
    play = true,
    pauseOnHover = false,
    pauseOnClick = false,
    direction = "left",
    duration = 20,
    delay = 0,
    loop = 0,
    gradient = false,
    gradientColor = [255, 255, 255],
    gradientWidth = 200,
    onFinish,
    onCycleComplete,
    children
}: CustomMarqueeProps) => {
    const [isMounted, setIsMounted] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const rgbaGradientColor = `rgba(${gradientColor[0]}, ${gradientColor[1]}, ${gradientColor[2]})`;

    return (
        <>
            {!isMounted ? null : (
                <div
                    style={{
                        ...style,
                        ["--pause-on-hover" as string]: !play || pauseOnHover ? "paused" : "running",
                        ["--pause-on-click" as string]: !play || (pauseOnHover && !pauseOnClick) || pauseOnClick ? "paused" : "running"
                    }}
                    className={styles["marquee-container"] + (className !== "" ? ` ${className}` : "")}
                >
                    {gradient && (
                        <div
                            style={{
                                ["--gradient-color" as string]: `${rgbaGradientColor}, 1), ${rgbaGradientColor}, 0)`,
                                ["--gradient-width" as string]:
                                typeof gradientWidth === "number"
                                    ? `${gradientWidth}px`
                                    : gradientWidth,
                            }}
                            className={styles.overlay}
                        />
                    )}
                    <div
                        style={{
                          ["--play" as string]: play ? "running" : "paused",
                          ["--direction" as string]:
                            direction === "left" ? "normal" : "reverse",
                          ["--duration" as string]: `${duration}s`,
                          ["--delay" as string]: `${delay}s`,
                          ["--iteration-count" as string]: !!loop ? `${loop}` : "infinite",
                        }}
                        className={styles.marquee}
                        onAnimationIteration={onCycleComplete}
                        onAnimationEnd={onFinish}
                    >
                        {children}
                    </div>
                    <div
                        style={{
                        ["--play" as string]: play ? "running" : "paused",
                        ["--direction" as string]:
                            direction === "left" ? "normal" : "reverse",
                        ["--duration" as string]: `${duration}s`,
                        ["--delay" as string]: `${delay}s`,
                        ["--iteration-count" as string]: !!loop ? `${loop}` : "infinite",
                        }}
                        className={styles.marquee}
                        aria-hidden="true"
                    >
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomMarquee;
