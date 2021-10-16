import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
export const NODE_SERVER = (v: string) => publicRuntimeConfig.NODE_SERVER + v;

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
