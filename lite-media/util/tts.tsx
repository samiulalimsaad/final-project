import { useEffect, useState } from "react";

const TexttoSpeech = () => {
    const [say, setSay] = useState("");
    useEffect(() => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = "Hello World";
        window.speechSynthesis.speak(msg);
    }, [say]);
    return setSay
};

export default TexttoSpeech;
