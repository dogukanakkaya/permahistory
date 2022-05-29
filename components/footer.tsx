import Image from 'next/image'

function Footer() {
    return (
        <div className='flex items-center justify-center h-20 border-t dark:border-gray-800'>
            <Image unoptimized src="./logo.png" width={35} height={35} alt="Permahistory" />
        </div>
    )
}

export default Footer