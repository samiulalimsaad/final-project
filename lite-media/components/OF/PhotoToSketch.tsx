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
                instance="da482353-24bf-4b1f-a9d8-79c827d7cece"
            ></of-widget>
        </div>
    );
};

export default PhotoToSketch;
