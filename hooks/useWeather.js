import * as React from "react";

export const defaults = Object.freeze({
    city: "",
    state: "",
    country: "",
    countryCode: "",
    latitude: null,
    longitude: null
});

export const currentDefaults = Object.freeze({
    temp: 0,
    icon: 19,
    wind: "",
    windSpeed: 0,
    visib: 0,
    uvIndex: "",
    phrase: "",
    humidity: 0,
    dewpt: 0,
    pres: 0
});

const memoAsync = (cb) => {
    const cache = new Map();
    return async (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const value = await cb(...args);
        cache.set(key, value);
        return value;
    };
};

export const getMainLocation = async (location) => {
    const memoizedFetch = memoAsync(fetch);

    return memoizedFetch(`https://api.weather.com/v3/location/search?query=${encodeURIComponent(location)}&language=en-US&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(res => {
            return res.json().then(data => {
                const dataLocs = data.location;

                const loc = Object.assign({}, defaults);
                loc.city = dataLocs.city[0];
                loc.state = dataLocs.adminDistrict[0];
                loc.country = dataLocs.country[0];
                loc.countryCode = dataLocs.countryCode[0];
                loc.latitude = dataLocs.latitude[0];
                loc.longitude = dataLocs.longitude[0];

                return loc;
            }).catch(err => {
                throw new Error(err);
            });
        }).catch(err => {
            throw new Error(err);
        });
};

export const getClosestLocation = async () => {
    return fetch(`https://pro.ip-api.com/json/?key=${process.env.NEXT_PUBLIC_IP_API_KEY}&exposeDate=true`)
        .then(res => {
            return res.json().then(data => {
                if (data.status === "success") {
                    const loc = Object.assign({}, defaults);
                    loc.city = data.city;
                    loc.state = data.region;
                    loc.country = data.country;
                    loc.countryCode = data.countryCode;
                    loc.latitude = data.lat;
                    loc.longitude = data.lon;

                    return loc;
                }

                return defaults;
            }).catch(err => {
                throw new Error(err);
            });
        }).catch(err => {
            throw new Error(err);
        });
};

export const getExtraLocations = async (lat, lon) => {
    return fetch(`https://api.weather.com/v3/location/near?geocode=${lat},${lon}&product=observation&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(res => {

        });
};

export const getCurrentCond = async (lat, lon) => {
    return fetch(`https://api.weather.com/v3/aggcommon/v3-wx-observations-current?geocodes=${lat},${lon};&language=en-US&units=h&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(res => {
            return res.json().then(data => {
                const dataLoc = data[0]["v3-wx-observations-current"];

                const current = Object.assign({}, currentDefaults);
                current.temp = dataLoc.temperature;
                current.icon = dataLoc.iconCode;
                current.wind = `${(dataLoc.windDirectionCardinal === "CALM" || dataLoc.windSpeed === 0 ? "Calm" : dataLoc.windDirectionCardinal)} ${dataLoc.windSpeed === 0 ? "" : dataLoc.windSpeed}`;
                current.windSpeed = dataLoc.windSpeed;
                current.visib = dataLoc.visibility;
                current.uvIndex = dataLoc.uvDescription;
                current.phrase = dataLoc.wxPhraseLong.toLowerCase();
                current.humidity = dataLoc.relativeHumidity;
                current.dewpt = dataLoc.temperatureDewPoint;
                current.pres = dataLoc.pressureAltimeter.toFixed(2);

                return current;
            }).catch(err => {
                throw new Error(err);
            });
        }).catch(err => {
            throw new Error(err);
        });
};