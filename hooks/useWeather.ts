import * as React from "react";
import { Icons2010 } from "./useIconMap";

// Mapped location
export interface Location {
  city: string;
  state: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface WeatherAPILocation {
  city: string[];
  adminDistrict: string[];
  country: string[];
  countryCode: string[];
  latitude: number[];
  longitude: number[];
  ianaTimeZone: string[];
}

interface WeatherAPILocResponse {
  location: Partial<WeatherAPILocation>;
}

// ip-api.com
enum IPAPIStatus {
  SUCCESS = "success",
  FAIL = "fail",
}

interface IPAPILocResponse {
  status: IPAPIStatus;
  city: string;
  region: string;
  regionName: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  timezone: string;
}

export const defaults: Location = Object.freeze({
  status: "",
  city: "",
  state: "",
  country: "",
  countryCode: "",
  latitude: null,
  longitude: null,
  timezone: "",
  nearbyCities: [],
});

export interface CurrentCond {
  temp: number;
  icon: number;
  wind: string;
  windSpeed: number;
  windDirection: number;
  visib: number;
  uvIndex: string;
  phrase: string;
  humidity: number;
  dewpt: number;
  pres: number;
}

export const currentDefaults: CurrentCond = Object.freeze({
  temp: NaN,
  icon: 44,
  wind: "",
  windSpeed: 0,
  windDirection: 0,
  visib: 0,
  uvIndex: "",
  phrase: "",
  humidity: 0,
  dewpt: 0,
  pres: 0,
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

const memoizedFetch = memoAsync(fetch);

export const getMainLocation = async (location: string, language?: string) => {
  const apiLanguage = language || "en";
  return memoizedFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location
    )}&appid=${
      process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY
    }&units=metric&lang=${apiLanguage}`
  )
    .then(async (res: Response) => {
      return res
        .json()
        .then((data: any) => {
          const loc = Object.assign({}, defaults);
          loc.city = data.name;
          loc.state = data.sys.country;
          loc.country = data.sys.country;
          loc.countryCode = data.sys.country;
          loc.latitude = data.coord.lat;
          loc.longitude = data.coord.lon;
          loc.timezone = data.timezone;

          return loc;
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getClosestLocation = async () => {
  return memoizedFetch(
    `https://pro.ip-api.com/json/?key=${process.env.NEXT_PUBLIC_IP_API_KEY}&exposeDate=true`
  )
    .then(async (res: Response) => {
      return res
        .json()
        .then((data: IPAPILocResponse) => {
          if (data.status === IPAPIStatus.SUCCESS) {
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
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getExtraLocations = async (lat: number, lon: number) => {
  // Get extra locations with OpenWeather API
  return memoizedFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
  )
    .then(async (res: Response) => {
      return res
        .json()
        .then((data: any) => {
          const locations = data.daily.map((day: any) => {
            const loc = Object.assign({}, defaults);
            loc.city = data.timezone;
            loc.state = data.timezone;
            loc.country = data.timezone;
            loc.countryCode = data.timezone;
            loc.latitude = data.lat;
            loc.longitude = data.lon;
            loc.timezone = data.timezone;

            return loc;
          });

          return locations;
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

// Get region condition from OpenWeather API
export const getCurrentCond = async (
  lat: number,
  lon: number,
  language?: string
) => {
  const apiLanguage = language || "en";
  return memoizedFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric&lang=${apiLanguage}`
  )
    .then(async (res: Response) => {
      return res
        .json()
        .then((data: any) => {
          const current = Object.assign({}, currentDefaults);
          current.temp = Math.round(data.main.temp);
          current.icon = data.weather[0].icon;
          current.wind = data.wind.deg;
          current.windSpeed = data.wind.speed;
          current.windDirection = data.wind.deg;
          current.visib = data.visibility;
          current.uvIndex = data.uvi || "";
          current.phrase = data.weather[0].description;
          current.humidity = data.main.humidity;
          current.dewpt = data.main.feels_like;
          current.pres = data.main.pressure;

          return current;
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

enum MessageType {
  New = 1,
  Update,
  Cancel,
}

enum AreaType {
  County = "C",
  Zone = "Z",
  CanadaLocation = "CLC",
}

enum Certainty {
  Observed = 1,
  Likely,
  Possible,
  Unlikely,
  Unknown,
}

enum Severity {
  Extreme = 1,
  Severe,
  Moderate,
  Minor,
  Unknown,
}

enum Urgency {
  Immediate = 1,
  Expected,
  Future,
  Past,
  Unknown,
}

// Category object
enum CategoryCode {
  Geo = 1,
  Met,
  Safety,
  Security,
  Rescue,
  Fire,
  Health,
  Env,
  Transport,
  Infra,
  CBRNE,
  Other,
}

interface Category {
  category: string;
  categoryCode: CategoryCode;
}

// Flood object
interface Flood {
  areaDesc: string;
  geocode: {
    valueName: string;
    value: string;
  };
  polygon: string;
  severity: Severity;
  certainty: Certainty;
  urgency: Urgency;
  instruction: string;
  headline: string;
  description: string;
  effective: string;
  onset: string;
  expires: string;
  senderName: string;
  contact: string;
  msgType: MessageType;
  source: string;
  event: string;
  response: string;
  parameter: {
    valueName: string;
    value: string;
  };
}

// Response type object
enum ResponseTypeCode {
  Shelter = 1,
  Evacuate,
  Prepare,
  Execute,
  Avoid,
  Monitor,
  Assess,
  AllClear,
  None,
}

interface ResponseType {
  responseType: string;
  responseTypeCode: ResponseTypeCode;
}

interface Text {
  languageCode: string;
  description: string;
  instruction: string;
  overview: string;
}

// Alert interface for OpenWeather API
export interface Alert {
  id: number;
  senderName: string;
  sent: string;
  status: string;
  msgType: MessageType;
  source: string;
  scope: string;
  restriction: string;
  addresses: string;
  code: string;
  note: string;
  references: string;
  incidents: string;
  info: {
    language: string;
    category: Category[];
    event: string;
    responseType: ResponseType[];
    urgency: Urgency;
    severity: Severity;
    certainty: Certainty;
    audience: string;
    eventCode: string;
    effective: string;
    onset: string;
    expires: string;
    senderName: string;
    headline: string;
    description: string;
    instruction: string;
    web: string;
    contact: string;
    parameter: any;
    resource: any;
    area: {
      areaDesc: string;
      polygon: string;
      geocode: {
        valueName: string;
        value: string;
      }[];
      circle: string;
      altitude: number;
      ceiling: number;
    }[];
    flood: Flood;
    text: Text;
  }[];
}

interface AlertsMetadata {
  next: any;
}

interface AlertsResponse {
  alerts: Alert[];
  metadata?: AlertsMetadata;
}

const alertsFallback: AlertsResponse = Object.freeze({
  metadata: {
    next: null,
  },
  alerts: [],
});

export const getAlerts = async (
  lat: number,
  lon: number,
  language?: string
) => {
  const apiLanguage = language || "en-US";
  return memoizedFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&lang=${apiLanguage}`
  )
    .then(async (res: Response) => {
      return res
        .json()
        .then((data: any) => {
          const alerts = data.alerts || [];
          return alerts;
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

interface AlertDetailResponse {
  alert: Alert;
}

export const getAlertText = async (
  alertId: string,
  language?: string
): Promise<Text[]> => {
  const apiLanguage = language || "en-US";
  return memoizedFetch(
    `https://api.openweathermap.org/data/2.5/alerts?appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&id=${alertId}&lang=${apiLanguage}`
  )
    .then(async (res: Response) => {
      return res
        .json()
        .then((data) => {
          const alert = data.alerts[0];
          return alert.info.text;
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
};
