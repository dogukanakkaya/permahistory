import { useState } from 'react';
import Link from 'next/link'

function Header() {
    const arConnect = async () => {
        window.arweaveWallet.connect(['ACCESS_ADDRESS']);

        const address = await window.arweaveWallet.getActiveAddress();
        console.log(address);
    }

    const [navOpen, setNavOpen] = useState(false);

    return (
        <header className='h-20 bg-white dark:bg-[#010102] shadow'>
            <div className="container flex items-center justify-between h-full">
                <div className='relative z-50 mx-5 sm:mx-0'>
                    <Link href="/"><img className='cursor-pointer w-8 md:w-12' src="/logo.png" alt="Permahistory" /></Link>
                </div>
                <nav className={`fixed z-40 inset-0 h-full bg-black bg-opacity-25 w-full sm:static sm:block ${!navOpen ? 'hidden' : ''}`}>
                    <div className="h-full overflow-y-auto flex sm:justify-end sm:items-center overflow-hidden bg-white dark:bg-[#010102] mr-40 sm:mr-0">
                        <ul className='mx-5 mt-20 sm:mt-0 sm:mx-0 flex flex-col sm:flex-row items-center'>
                            <li className='relative'>
                                <span onClick={arConnect} className="nav-item cursor-pointer font-semibold">ArConnect</span>
                                <span className="flex absolute h-1.5 w-1.5 -right-2 sm:right-4 top-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                </span>
                            </li>
                            <li><Link href="/about"><a className="nav-item">About</a></Link></li>
                            <li><Link href="/faq"><a className="nav-item">FAQ</a></Link></li>
                            <li><button type="button" className="font-semibold text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-lg text-sm px-5 py-2.5 text-center">Start Writing</button></li>
                        </ul>
                    </div>
                </nav>
                <div className='sm:hidden mx-5 sm:mx-0'>
                    <button onClick={() => setNavOpen(!navOpen)}><i className="bi bi-list text-white text-3xl"></i></button>
                </div>
            </div>
        </header>
    )
}

export default Header