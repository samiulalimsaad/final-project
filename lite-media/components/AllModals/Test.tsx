import Script from "next/script";
const Test = () => {
    return (
        <div>
            <link rel="stylesheet" href="http://52.18.33.238/widget.css" />
            <Script
                src="http://52.18.33.238/widget-es2015.js"
                type="module"
            ></Script>
            <Script
                src="http://52.18.33.238/widget-es5.js"
                noModule
                defer
            ></Script>
            <of-widget
                class="of__root"
                instance="ddfa2093-fb81-4dcb-b0da-c35432a17abb"
            ></of-widget>
        </div>
    );
};

export default Test;
