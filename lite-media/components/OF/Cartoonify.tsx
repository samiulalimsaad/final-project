import Script from "next/script";

const Cartoonify = () => {
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
                instance="daf4aa56-f68a-4761-b60b-9ac2c606ede1"
            ></of-widget>
        </div>
    );
};

export default Cartoonify;
