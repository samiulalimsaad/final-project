import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <React.Fragment>
            <Head>
                <title>My page</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <Component {...pageProps} />
        </React.Fragment>
    );
}
