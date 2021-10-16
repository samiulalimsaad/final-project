import Conversation from "../message/index";
const Assistant = () => {
    return (
        <div className="bg-white h-full w-full mt-3 rounded-md shadow absolute">
            <div>
                <Conversation />
            </div>
        </div>
    );
};

export default Assistant;
