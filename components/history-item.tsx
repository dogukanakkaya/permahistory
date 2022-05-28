import Link from 'next/link';
import { timeSince } from '../utils';

function HistoryItem({ item }: { item: HistoryItem }) {
    return (
        <Link href="/">
            <div className='rounded-lg p-6 shadow cursor-pointer bg-white hover:bg-gray-100 dark:bg-[#010102] hover:dark:bg-black hover:dark:shadow-xl'>
                <div className="text-gray-400">
                    <div className='flex justify-between'>
                        <h2 className='text-xl font-semibold'>{item.title}</h2>
                        <ul className='flex'>
                            {
                                item.tags.map(tag => <li key={tag}><Link href="/"><a className='mr-4 text-sm text-gray-400 underline'>#{tag}</a></Link></li>)
                            }
                        </ul>
                    </div>
                    {item.description && <p>{item.description}</p>}
                    <span className='block mt-5 text-sm'>{timeSince(new Date(item.createdAt))} ago</span>
                </div>
            </div>
        </Link>
    )
}

export interface HistoryItem {
    title: string;
    description?: string;
    content: string;
    createdAt: Date;
    tags: string[];
}

export default HistoryItem