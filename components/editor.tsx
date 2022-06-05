import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

function Editor({ data, setData, ...otherProps }: Props) {
    // todo: create your own editor with react-markdown
    // any of the editor's out there not satisfies me
    return (
        <div {...otherProps}>
            <MDEditor
                value={data}
                onChange={value => value ? setData(value) : setData('')}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
                height={600}
                placeholder='Enter your content'
            />
        </div>
    );
}

interface Props {
    data: string;
    setData: (value: string) => void;
    [key: string]: any;
}

export default Editor;