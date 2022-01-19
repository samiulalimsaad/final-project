import Script from "next/script";

const TextTranslate = () => {
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
                instance="b1b8c97f-c251-43a8-ad87-7e7afdeb3bda"
            ></of-widget>
        </div>
    );
};

export default TextTranslate;
