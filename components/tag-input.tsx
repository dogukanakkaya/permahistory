import { WithContext as ReactTags, type Tag } from 'react-tag-input';

enum Delimiter {
    COMMA = 188,
    ENTER = 13,
    TAB = 9
}

function TagInput({ tags, setTags, ...otherProps }: Props) {
    const handleAddition = (tag: Tag) => {
        if (tags.length > 3) {
            alert('You can add up to 5 tags');
            return;
        }

        setTags([...tags, tag]);
    }

    return (
        <div {...otherProps}>
            <ReactTags
                tags={tags}
                delimiters={Object.values(Delimiter).filter(v => typeof v === 'number') as number[]}
                handleDelete={(i: number) => setTags(tags.filter((_, index) => index !== i))}
                handleAddition={handleAddition}
                inputFieldPosition="top"
                placeholder='add tags for people to find your writings (public only)'
                classNames={{
                    tagInput: 'block mb-4',
                    tagInputField: 'w-full',
                    tag: 'px-2 py-1 mr-2 mb-2 inline-block text-sm bg-gray-200 dark:bg-gray-700',
                    remove: 'ml-2'
                }}
            />
        </div>
    )
}


interface Props {
    tags: Tag[];
    setTags: (value: Tag[]) => void;
    [key: string]: any;
}

export default TagInput;