import logoDark from '../public/logo-transparent-text-white.svg';
import logoWhite from '../public/logo-transparent-text-dark.svg';

function Footer() {
    return (
        <div className='flex items-center justify-center h-20 border-t dark:border-gray-800'>
            <div className="hidden dark:block">
                <img src={logoDark.src} className='w-48 sm:w-60 cursor-pointer' alt="Permahistory" />
            </div>
            <div className="block dark:hidden">
                <img src={logoWhite.src} className='w-48 sm:w-60 cursor-pointer' alt="Permahistory" />
            </div>
        </div>
    )
}

export default Footer