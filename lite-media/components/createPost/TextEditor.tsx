import React, { memo, useEffect, useRef } from "react";

interface myEditorInterface {
    editorState: string;
    setEditorState: any;
}

const MyEditor = ({ editorState, setEditorState }: myEditorInterface) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        ref?.current?.focus();
    }, []);

    return (
        <textarea
            ref={ref}
            autoComplete="false"
            value={editorState}
            onChange={(e) => setEditorState(e.target.value)}
            className="h-full w-full resize-none border-4 rounded-md border-gray-900/20 drop-shadow-md focus:ring-0 focus:border-gray-900/20"
        />
    );
};

export default memo(MyEditor);
