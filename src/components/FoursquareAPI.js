class Helper {

    // Getting the baseURL of Foursquare API
    static baseURL() {
        return "https://api.foursquare.com/v2"
    }
    static auth() {
        const keys = {
            // Adding my client id, client secret and version 
            client_id: "RWEN2IQABZYQKYCTLQG2TZ3PUPC05YZHEUR3QMTSA5PFKSV2",
            client_secret: "MFEGABVJ11AJFBYLNHVXHLXEVFC3OZI0NVZ2WFTMLMX10UU2",
            v: 20181120
        };
        return Object.keys(keys)
            .map(key => `${key}=${keys[key]}`)
            .join("&");
    }
    static urlBuilder(urlParams) {
        if(!urlParams) {
            return "";
        }
        return Object.keys(urlParams)
            .map(key => `${key}=${urlParams[key]}`)
            .join("&");
    }
    static headers() {
        return {
            Accept: "application/json"
        };
    }
    
    // Fetching from 3rd party API
    static simpleFetch(endPoint, method, urlParams) {
        // eslint-disable-next-line
        let requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlParams)}`)
        .then(res => res.json());
    }
}

export default class FoursquareAPI {

    static search(urlParams) {
        return Helper.simpleFetch("/venues/search", "GET", urlParams);
    }
    static getVenueDetails(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
    }
    static getVenuephotos(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
    }
}