import { Interface } from "readline";

export interface userDetailsType {
    "name": string,
    "email": string,
    "_id": string,
    "telegram": string,
    "whatsapp": string,
    "unifyreId": string,
    "country": string,
    "zip":string,
    "city":string,
    "id":number,
    "loading": boolean
}

export interface adsType {
    "ads": [],
    "loading": boolean
}