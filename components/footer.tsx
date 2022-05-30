import Image from 'next/image';
import logo from '../public/logo.png';

function Footer() {
    return (
        <div className='flex items-center justify-center h-20 border-t dark:border-gray-800'>
            <Image unoptimized src={logo} width={35} height={35} alt="Permahistory" />
        </div>
    )
}

export default Footer