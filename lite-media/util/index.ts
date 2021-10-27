import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
export const NODE_SERVER = (v: string) => {
    const a = publicRuntimeConfig.NODE_SERVER + v;
    console.log("NODE_SERVER", a);
    return a;
};

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
