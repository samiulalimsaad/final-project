import { useState } from "react";
import { GetState } from "../../state/stateProvider";
import { SHOW_OF_MODAL } from "../../state/types";
import Cartoonify from "./Cartoonify";
import CognitiveAssistant from "./CognitiveAssistant";
import HandwritingEquationSolver from "./HandwritingEquationSolver";
import ImageOutpaint from "./ImageOutpaint";
import ImageToText from "./ImageToText";
import PhotoToSketch from "./PhotoToSketch";

export const OF_Widget = [
    {
        name: "Chatbot",
        component: <CognitiveAssistant />,
    },
    {
        name: "Handwriting Equation Solver",
        component: <HandwritingEquationSolver />,
    },
    {
        name: "Photo to Sketch",
        component: <PhotoToSketch />,
    },
    {
        name: "Image Outpaint",
        component: <ImageOutpaint />,
    },
    {
        name: "Text Summary",
        component: <ImageOutpaint />,
    },
    {
        name: "Cartoonify",
        component: <Cartoonify />,
    },
    {
        name: "Image to Text",
        component: <ImageToText />,
    },
];

const OF = () => {
    const { dispatch } = GetState();
    const [index, setIndex] = useState(0);
    return (
        <div>
            <div className="mt-8">
                <select
                    id="of"
                    name="of"
                    autoComplete="of"
                    onChange={(e) => setIndex(+e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    {OF_Widget.map((v, i) => (
                        <option key={v.name} value={i}>
                            {v.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button
                    className="group relative w-full mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() =>
                        dispatch({ type: SHOW_OF_MODAL, payload: { index } })
                    }
                >
                    Run
                </button>
            </div>
        </div>
    );
};

export default OF;
