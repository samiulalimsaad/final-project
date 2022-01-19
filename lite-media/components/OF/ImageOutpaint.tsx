import Script from "next/script";

const ImageOutpaint = () => {
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
                instance="77ffdbd4-a61a-4bd8-9cde-dc3986b33386"
            ></of-widget>
        </div>
    );
};

export default ImageOutpaint;
