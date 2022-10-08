export const getMainLocation = (location) => {
    if (typeof location === "string") {
        fetch(`https://api.weather.com/v3/location/search?query=${encodeURIComponent(location)}&language=en-US&format=json&apiKey=${process.env.WEATHER_API_KEY}`)
            .then(data => {

            });
    }
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