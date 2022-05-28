import Link from 'next/link';
import { timeSince } from '../utils';

function HistoryItem({ item }: { item: HistoryItem }) {
    return (
        <Link href="/">
            <div className='w-full flex justify-between rounded-lg p-6 shadow cursor-pointer bg-white hover:bg-gray-100 dark:bg-[#010102] hover:dark:bg-black hover:dark:shadow-xl'>
                <div className="text-gray-400">
                    <h2 className='text-xl font-semibold'>{item.title}</h2>
                    {item.description && <p>{item.description}</p>}
                    <span className='block mt-5 text-sm'>{timeSince(new Date(item.createdAt))} ago</span>
                </div>
                <div className='flex flex-col justify-between items-end'>
                    <ul className='flex'>
                        {
                            item.tags.map(tag => <li><Link href="/"><a className='mr-4 text-sm text-gray-400 underline'>#{tag}</a></Link></li>)
                        }
                    </ul>
                    <Link href="/"><a className='className="font-semibold text-white focus:outline-none bg-sky-700 shadow-lg shadow-sky-800/50 dark:shadow-lg dark:shadow-sky-900/80 rounded-lg text-sm px-5 py-2.5'>Read</a></Link>
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