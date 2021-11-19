import axios from "axios";
import { memo, useEffect } from "react";
import { GetState } from "../../state/stateProvider";
import { PYTHON_SERVER } from "../../util";
import Conversation from "../message/index";
const Assistant = () => {


    return (
        <div className="bg-white h-72 w-full mt-3 rounded-md shadow relative">
            <Conversation conversationName={"Assistant"} conversationId={""} />
        </div>
    );
};

export default memo(Assistant);
