import axios from "axios";
import getConfig from "next/config";

export const REFRESH_INTERVAL = 15000;

const { publicRuntimeConfig } = getConfig();
export const NODE_SERVER = (v: string) => {
    const a = publicRuntimeConfig.NODE_SERVER + v;
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

//  export const fetcher = async (url: string) => {
//      console.log("fetcher function called")
//      try {
//          const res = await axios.get(url);
//          console.log({res:res.data})
//          return res.data;

//      } catch (error) {
//           throw new Error("An error occurred while fetching the data.");
//     }

//   };
