import { useState } from 'preact/hooks';
import { Link } from 'preact-router';
import logoDark from '@/assets/logo-transparent-text-white.svg';
import logoWhite from '@/assets/logo-transparent-text-dark.svg';

export default function Header() {
    const [navOpen, setNavOpen] = useState(false);

    const handleNavClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).tagName === 'NAV') {
            setNavOpen(false);
        }
    }

    return (
        <header className='h-20 dark:bg-[#010102] shadow'>
            <div className="container flex items-center justify-between h-full">
                <div className='relative z-50 mx-5 sm:mx-0'>
                    <Link href="/">
                        <a className="hidden dark:block"><img src={logoDark} className='w-48 sm:w-96 cursor-pointer' alt="Permahistory" /></a>
                    </Link>
                    <Link href="/">
                        <a className="block dark:hidden"><img src={logoWhite} className='w-48 sm:w-96 cursor-pointer' alt="Permahistory" /></a>
                    </Link>
                </div>
                <nav className={`fixed z-40 inset-0 h-full bg-black bg-opacity-25 w-full sm:static sm:block ${!navOpen ? 'hidden' : ''}`} onClick={handleNavClick}>
                    <div className="h-full overflow-y-auto sm:flex sm:justify-end sm:items-center overflow-hidden bg-white dark:bg-[#010102] mr-36 sm:mr-0">
                        <ul className='mx-5 mt-20 sm:mt-0 sm:mx-0 flex flex-col sm:flex-row items-start'>
                            <li><Link href="/history" className="nav-item font-semibold">History</Link></li>
                            <li className='relative'>
                                <Link href="/history?my=1">
                                    <span className="nav-item cursor-pointer font-semibold">My History</span>
                                    <span className="flex absolute h-1.5 w-1.5 -right-2 sm:right-4 top-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                    </span>
                                </Link>
                            </li>
                            <li><Link href="/faq" className="nav-item">FAQ</Link></li>
                            <li><Link href="/write" className="font-semibold text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-lg text-sm px-5 py-2.5">Start Writing</Link></li>
                        </ul>
                    </div>
                </nav>
                <div className='sm:hidden mx-5 sm:mx-0'>
                    <button onClick={() => setNavOpen(!navOpen)}><i className="bi bi-list dark:text-white text-3xl"></i></button>
                </div>
            </div >
        </header >
    )
}