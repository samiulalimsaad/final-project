import Script from "next/script";

const ImageToText = () => {
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
                instance="6808e1b9-15c9-4992-8c07-0bcb849bec66"
            ></of-widget>
        </div>
    );
};

export default ImageToText;
