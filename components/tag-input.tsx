import { TagsInput } from "react-tag-input-component";

function TagInput({ tags, setTags, ...otherProps }: Props) {
    return (
        <div {...otherProps}>
            <TagsInput
                value={tags}
                seprators={Object.values(Delimiter).filter(v => typeof v === 'string') as string[]}
                onChange={setTags}
                placeHolder='Enter tags (not encrypted even for private writings, so you can search for)'
            />
        </div>
    )
}

enum Delimiter {
    COMMA = ',',
    ENTER = 'Enter',
    TAB = 'Tab'
}

interface Props {
    tags: string[];
    setTags: (value: string[]) => void;
    [key: string]: any;
}

export default TagInput;