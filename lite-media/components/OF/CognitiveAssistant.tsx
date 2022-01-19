import Script from "next/script";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "of-widget": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}
declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        instance?: string;
    }
}
const CognitiveAssistant = () => {
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
                instance="f358407b-68f1-4464-98a0-34e31d9d7236"
            ></of-widget>
        </div>
    );
};

export default CognitiveAssistant;
