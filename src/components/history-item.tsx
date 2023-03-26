import { Link } from 'preact-router';
import { timeSince } from '@/utils';
import { HistoryItemType } from '@/zod';

export default function HistoryItem({ item }: { item: HistoryItemType }) {
    return (
        <Link href={`/history/${item.id}`}>
            <div className='h-36 rounded-lg p-6 shadow cursor-pointer bg-white bg-hover:bg-gray-100 dark:bg-[#010102] hover:dark:bg-black hover:dark:shadow-xl'>
                <div className="text-gray-400">
                    <div className='flex justify-between items-center'>
                        <h2 className='text-gray-600 dark:text-gray-100 text-xl font-semibold'>{item.title}</h2>
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