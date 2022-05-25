import { useState } from 'react'
import Header from './header'

function Layout({ children }: { children: React.ReactNode }) {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <Header navOpen={navOpen} />

            <main>{children}</main>

            <ul className="lg:hidden z-50 right-0 bottom-0 fixed flex flex-col items-end w-max">
                <li onClick={() => setNavOpen(!navOpen)} className="rounded-full bg-black w-16 h-16 flex items-center justify-center m-1">
                    <i className="bi bi-list text-white text-2xl"></i>
                </li>
            </ul>
        </>
    )
}

export default Layout