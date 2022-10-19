import * as React from "react";

export type Location = {
    status: string // Closest location response
    city: string
    state: string
    country: string
    countryCode: string
    latitude: number
    longitude: number
    timezone: string
}

type LocationResponse = {
    location: Partial<Location>
}

export const defaults: Location = Object.freeze({
    status: "",
    city: "",
    state: "",
    country: "",
    countryCode: "",
    latitude: null,
    longitude: null,
    timezone: ""
});

export type CurrentCond = {
    temp: number
    icon: number
    wind: string
    windSpeed: number
    visib: number
    uvIndex: string
    phrase: string
    humidity: number
    dewpt: number
    pres: number
}

export const currentDefaults: CurrentCond = Object.freeze({
    temp: NaN,
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

export const getMainLocation = async (location: string | string[]) => {
    const memoizedFetch = memoAsync(fetch);

    return memoizedFetch(`https://api.weather.com/v3/location/search?query=${encodeURIComponent(<string>location)}&language=en-US&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then((res: Response) => {
            return res.json().then((data: LocationResponse) => {
                return data.location;
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
                    const closest = Object.assign({}, defaults);
                    closest.city = data.city;
                    closest.state = data.region;
                    closest.country = data.country;
                    closest.countryCode = data.countryCode;
                    closest.latitude = data.lat;
                    closest.longitude = data.lon;
                    closest.timezone = data.timezone;

                    return closest;
                }

                return defaults;
            }).catch(err => {
                throw new Error(err);
            });
        }).catch(err => {
            throw new Error(err);
        });
};

export const getExtraLocations = async (lat: number, lon: number) => {
    return fetch(`https://api.weather.com/v3/location/near?geocode=${lat},${lon}&product=observation&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(res => {

        });
};

export const getCurrentCond = async (lat: number, lon: number) => {
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