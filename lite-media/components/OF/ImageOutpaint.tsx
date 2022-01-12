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
                instance="563ab559-dd30-4aab-8ea7-f0f698900e6c"
            ></of-widget>
        </div>
    );
};

export default ImageOutpaint;
