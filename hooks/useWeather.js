import * as React from "react";

const defaults = {
    city: "",
    state: "",
    country: "",
    countryCode: "",
    latitude: 0,
    longitude: 0
};

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

export const getMainLocation = (location) => {
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

export const getClosestLocation = () => {
    return fetch(`https://pro.ip-api.com/json/?key=${process.env.NEXT_PUBLIC_IP_API_KEY}&exposeDate=true`)
        .then(res => {
            return res.json().then(data => {
                if (data.status === "success") {
                    return `${data.city},${data.region}`;
                }

                return null;
            }).catch(err => {
                throw new Error(err);
            });
        }).catch(err => {
            throw new Error(err);
        });
};

export const getExtraLocations = (lat, lon) => {
    return fetch(`https://api.weather.com/v3/location/near?geocode=${lat},${lon}&product=observation&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(res => {

        });
};