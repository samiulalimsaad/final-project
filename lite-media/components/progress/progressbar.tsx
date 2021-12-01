import React from "react";
import { GetState } from "../../state/stateProvider";

const Progressbar = () => {
    const {progress} = GetState()

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
