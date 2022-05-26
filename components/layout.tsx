import Footer from './footer';
import Header from './header'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />

            <main className='mx-5 sm:mx-0 mt-5 lg:mt-0'>{children}</main>

            <Footer />
        </>
    )
}

export default Layout