import Script from "next/script";

const EdgeDetection = () => {
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
                className="of__root"
                instance="65be7b24-0a62-49c0-9079-9b81b2e72250"
            ></of-widget>
        </div>
    );
};

export default EdgeDetection;
