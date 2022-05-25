import React from 'react'
import PropTypes from 'prop-types';

function Header({ navOpen }: { navOpen: boolean }) {
    return (
        <header className='h-20 bg-white dark:bg-[#010102] shadow'>
            <div className="container flex items-center h-full">
                <nav className={`fixed z-40 inset-0 h-full bg-black bg-opacity-25 w-full lg:bg-white lg:dark:bg-[#010102] lg:static lg:block ${!navOpen ? 'hidden' : ''}`}>
                    <div className="h-full overflow-y-auto p-4 lg:p-0 lg:flex justify-between items-center overflow-hidden bg-white dark:bg-[#010102] mr-24 md:mr-48 lg:mr-0">
                        <div>
                            <h1 className='text-3xl font-semibold'>Permahistory</h1>
                        </div>
                        <ul className='flex items-center'>
                            <li><a href="#" className="nav-item">FAQ</a></li>
                            <li><button type="button" className="font-semibold text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 rounded-lg text-sm px-5 py-2.5 text-center">Start Writing</button></li>
                        </ul>
                    </div>
                </nav>
            </div >
        </header >
    )
}

Header.propTypes = {
    navOpen: PropTypes.bool
};

export default Header