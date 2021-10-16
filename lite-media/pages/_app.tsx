import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { StateProvider } from "../state/stateProvider";
import "../styles/globals.css";
import "../firebase.ts"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Head>
                <title>Light Media</title>
                <meta name="description" content="Light Media Social app" />
                <link
                    rel="icon"
                    href="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    sizes="any"
                    type="image/svg+xml"
                />
            </Head>
            <main className="overflow-hidden h-screen w-screen">
                <StateProvider>
                    <Component {...pageProps} />
                </StateProvider>
            </main>
        </div>
    );
}
export default MyApp;
