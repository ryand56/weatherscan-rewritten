import * as React from "react";
import type { MainSlideProps } from "../../../../../hooks/useSlides";
import { SlideshowReducer, SlidesCity, ActionType } from "../../../../../hooks/useSlides";

import CityIntro from "./CityIntro";
import CityInfo from "./CityInfo";

const City = ({ next, location, currentCityInfo, introNeeded }: MainSlideProps) => {
    const [slideState, slideDispatch] = React.useReducer(SlideshowReducer, { index: 0 });

    const SlideCallback = React.useCallback(() => {
        if (slideState.index >= 1) {
            next();
            slideDispatch({ type: ActionType.SET, payload: 1 });
        } else {
            slideDispatch({ type: ActionType.INCREASE, payload: 1 });
        }
    }, [slideState.index]);

    const currentSlide = React.useMemo(() => {
        console.log("Rendering new city slide");
        switch (slideState.index) {
            case SlidesCity.INTRO:
                return <CityIntro next={SlideCallback} />;
            case SlidesCity.INFO:
                return <CityInfo
                    next={SlideCallback}
                    location={location}
                    currentCityInfo={currentCityInfo}
                />;
        }
    }, [slideState.index, SlideCallback, location, currentCityInfo]);

    return currentSlide;
};

export default City;
