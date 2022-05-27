import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

function Editor() {
    const [value, setValue] = useState('');

    // todo: create your own editor with react-markdown
    // any of the editor's out there not satisfies me
    return (
        <div className='mt-5 dark:invert'>
            <MDEditor
                value={value}
                onChange={setValue}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
                height={600}
            />
        </div>
    );
}

export default Editor;