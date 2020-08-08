import * as Sentry from "@sentry/react-native";


const LiveUrl = "https://";
const DevUrl = "http://localhost:3001";

let url = LiveUrl;


export const ReportSentryError = (error, scopeData = {}) => {
    Sentry.configureScope((scope) => {
        scope.setExtra("Data", {
            ...scopeData,
        });
    });
    Sentry.captureException(error);
};



const PostRequest = (endpoint,  body = {}, qs = {}, headers = {}) => {
    return new Promise((resolve, reject) => {

        let fullUrl = new URL(url + endpoint);
        fullUrl.search = new URLSearchParams(qs).toString();

        fetch(fullUrl.toString(), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        }).then((response) => response.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                //error logging
                reject(error);
            });
    })
}

const GetRequest = (endpoint,  qs = {}, headers = {}) => {
    return new Promise((resolve, reject) => {

        let fullUrl = new URL(url + endpoint);
        fullUrl.search = new URLSearchParams(qs).toString();

        fetch(fullUrl.toString(), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ...headers
            }
        }).then((response) => response.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                //error logging
                reject(error);
            });
    })
}