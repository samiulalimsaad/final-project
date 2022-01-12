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
                instance="6e75bfb7-dd4b-4300-b97b-411023ccc762"
            ></of-widget>
        </div>
    );
};

export default HandwritingEquationSolver;
