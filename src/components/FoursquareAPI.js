class Helper {

    // Getting the baseURL of Foursquare API
    static baseURL() {
        return "https://api.foursquare.com/v2"
    }
    static auth() {
        const keys = {
            // Adding my client id, client secret and version 
            client_id: "ICN1F4HULSQA42LDTNL04DPF4T2BBZBUATHHR43X3UK4B4L1",
            client_secret: "RUSMZTKVV3TABPCOC1NTH532R2DA4PQTON2S4HMELETILQD2",
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
        let requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
            urlParams
        )}`
        ).then(res => res.json());
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