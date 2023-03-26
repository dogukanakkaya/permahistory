import Router from 'preact-router'
import Footer from './components/footer'
import Header from './components/header'
import Home from './pages'
import Faq from './pages/faq'

export function App() {
  return (
    <>
      <Header />
      <Router>
        <Home path="/" />
        <Faq path="/faq" />
      </Router>
      <Footer />
    </>
  )
}
