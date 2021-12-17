import axios from "axios";
import getConfig from "next/config";

export const REFRESH_INTERVAL = 15000;

const { publicRuntimeConfig } = getConfig();

const nodeServer = publicRuntimeConfig.NODE_SERVER;

export const NODE_SERVER = (v: string) => {
    const a = nodeServer + v;
    // console.log("NODE_SERVER", a);
    return a;
};
export const PYTHON_SERVER = (v: string) => {
    const a = publicRuntimeConfig.PYTHON_SERVER + v;
    console.log("PYTHON_SERVER", a);
    return a;
};

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const tempLoadingValue = [] as number[];
tempLoadingValue.length = 100;
tempLoadingValue.fill(1);

export { tempLoadingValue };
