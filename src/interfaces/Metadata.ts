import {ValidationContext} from "./ValidationContext";

export interface Metadata {
    [key: string]: ValidationContext[];
}
