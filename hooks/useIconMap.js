const Icons2010 = Object.freeze({
    UNUSED: 0,
    THUNDER: 1,
    MIXED_RAIN_SNOW: 2,
    MIXED_FREEZE_RAIN_SNOW: 3,
    LIGHT_RAIN_ICY: 4,
    LIGHT_RAIN: 5,
    RAIN_ICY: 6,
    LIGHT_RAIN_ALT: 7,
    RAIN: 8,
    SNOW: 9,
    SNOW_ALT: 10,
    BLIZZARD: 11,
    HEAVY_SNOW: 12,
    HAIL: 13,
    HAZY: 14,
    FOG: 15,
    HAZY_ALT: 16,
    WIND: 17,
    HEAVY_WIND: 18,
    UNK: 19,
    CLOUDS: 20,
    MOSTLY_CLOUDS_NIGHT: 21,
    MOSTLY_CLOUDS: 22,
    PARTLY_CLOUDS_NIGHT: 23,
    PARTLY_CLOUDS: 24,
    CLEAR_NIGHT: 25,
    CLEAR: 26,
    LIGHT_CLOUDS_NIGHT: 27,
    LIGHT_CLOUDS: 28,
    THUNDER_SUN: 29,
    RAIN_SUN: 30,
    HEAVY_RAIN: 31,
    HEAVY_SNOW_SUN: 32,
    HEAVY_SNOW_ALT: 33,
    HEAVY_SNOW_ALT2: 34,
    RAIN_NIGHT: 35,
    SNOW_NIGHT: 36,
    THUNDER_NIGHT: 37,
    HEAVY_RAIN_HAIL: 38,
    SNOW_WIND: 39,
    SNOW_STORM: 40,
    HOT: 41,
    COLD: 42,
    HEAVY_RAIN_SNOW_ICY: 44,
    HEAVY_RAIN_ALT: 45,
    LIGHT_THUNDER: 46,
    THUNDER_ALT: 47,
    HAIL_ALT: 48,
    FOG_ALT: 49,
    HEAVY_WIND_ALT: 50
});

/* wip */
const Icons2010CodeMap = Object.freeze({
    "0": Icons2010.UNUSED,
    "1": Icons2010.UNUSED,
    "2": Icons2010.UNUSED,
    "3": Icons2010.THUNDER_ALT,
    "4": Icons2010.THUNDER,
    "5": Icons2010.MIXED_RAIN_SNOW,
    "6": Icons2010.HEAVY_RAIN_HAIL,
    "7": Icons2010.MIXED_FREEZE_RAIN_SNOW,
    "8": Icons2010.LIGHT_RAIN_ICY,
    "9": Icons2010.LIGHT_RAIN,
    "10": Icons2010.RAIN_ICY,
    "11": Icons2010.RAIN,
    "12": Icons2010.RAIN,
    "13": Icons2010.SNOW,
    "14": Icons2010.HEAVY_SNOW
});

export const getIcon = (iconCode, windData) => {
    let icon = Icons2010CodeMap[iconCode];
    if (parseInt(windData) >= 20) {
        if (icon === Icons2010.HEAVY_SNOW || icon === Icons2010.SNOW || icon === Icons2010.SNOW_ALT) {
            icon = Icons2010.HEAVY_SNOW_ALT2;
        } else if (icon === Icons2010.HEAVY_RAIN || icon === Icons2010.LIGHT_RAIN_ALT || icon === Icons2010.RAIN) {
            icon = Icons2010.HEAVY_RAIN_ALT;
        }
    }
    return icon;
};