import { getDatabase, ref, onValue} from "firebase/database";
import { useState } from "react";
import { GetState } from "../../state/stateProvider";
const MessageBody = ({conversationId}:{conversationId:string}) => {

const db = getDatabase();
    const { displayName, uid } = GetState();
    const [message, setMessage] = useState({})

const starCountRef = ref(db, `message/${uid}-${conversationId}`);
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  setMessage(data)
});
console.log({message})
    return (
        <div>
            Enter
        </div>
    );
}

export default MessageBody;