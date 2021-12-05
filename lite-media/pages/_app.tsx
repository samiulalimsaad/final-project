import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "../firebase.ts";
import { StateProvider } from "../state/stateProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Head>
                <title>Light Media</title>
                <meta name="description" content="Light Media Social app" />
                <link
                    rel="icon"
                    href="/logo.svg"
                    sizes="any"
                    type="image/svg+xml"
                />
            </Head>
            <StateProvider>
                <Component {...pageProps} />
            </StateProvider>
        </div>
    );
}
export default MyApp;
