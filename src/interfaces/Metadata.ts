import {ValidationContext} from "./ValidationContext.js";

export interface Metadata {
    [key: string]: ValidationContext[];
}
