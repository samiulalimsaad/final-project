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
                instance="22015b92-74b9-4798-9483-8c59213fee3f"
            ></of-widget>
        </div>
    );
};

export default TextSummary;
