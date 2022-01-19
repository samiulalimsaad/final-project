import Script from "next/script";

const HandwritingEquationSolver = () => {
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
                instance="b1aba6ca-a153-4a7f-a1f6-0f85b449f5c9"
            ></of-widget>
        </div>
    );
};

export default HandwritingEquationSolver;
