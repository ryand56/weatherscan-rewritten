export const getMainLocation = (location) => {
    return fetch(`https://api.weather.com/v3/location/search?query=${encodeURIComponent(location)}&language=en-US&format=json&apiKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        .then(res => {
            return res.json().then(data => {
                return data;
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