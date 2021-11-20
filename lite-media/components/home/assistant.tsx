import { memo } from "react";
import { GetState } from "../../state/stateProvider";
import Conversation from "../message/index";
const Assistant = () => {
    const { uid } = GetState();

    return (
        <div className="bg-white h-72 w-full mt-3 rounded-md shadow relative">
            <Conversation
                conversationName={"Assistant"}
                conversationId={`${uid}assistant`}
            />
        </div>
    );
};

export default memo(Assistant);
