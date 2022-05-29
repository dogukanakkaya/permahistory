import Image from 'next/image'

function Footer() {
    return (
        <div className='flex items-center justify-center h-20 border-t dark:border-gray-800'>
            <Image src="/logo.png" alt="Permahistory" width={35} height={35} className='cursor-pointer' />
        </div>
    )
}

export default Footer