import Script from "next/script";

const PhotoToSketch = () => {
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
                instance="f3057801-5bf2-4ad8-9cb0-963c288becb8"
            ></of-widget>
        </div>
    );
};

export default PhotoToSketch;
