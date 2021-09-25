import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "../styles/globals.css";

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

            <Component {...pageProps} />
        </div>
    );
}
export default MyApp;
