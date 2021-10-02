/* This example requires Tailwind CSS v2.0+ */
import React from "react";

const Progressbar = () => {
    const [progress, setProgress] = React.useState(20);
    React.useEffect(() => {
        const t = setInterval(() => {
                setProgress((prevProgress) => prevProgress>= 100 ? 20 :prevProgress + 10
                );
        }, 2000);
        console.log("mount");
        return () => {
            clearInterval(t);
            console.log("unmount");
        };
    }, [ progress]);

        return (
            <div
                className={`absolute inset-0 top-16 right-0 overflow-hidden h-1 z-50 text-xs flex rounded bg-purple-200 `}
            >
                <div
                    style={{ width: `${progress}%`, transition:"width 2s"}}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                ></div>
            </div>
        );
};

export default Progressbar;
