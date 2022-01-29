import Script from "next/script";

const TextSummary = () => {
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
                instance="ed8355f8-4dd5-4d8a-849b-9e041ed64f5d"
            ></of-widget>
        </div>
    );
};

export default TextSummary;
