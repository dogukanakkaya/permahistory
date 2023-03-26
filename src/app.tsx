import Router from 'preact-router'
import Footer from './components/footer'
import Header from './components/header'
import Home from './pages'
import Faq from './pages/faq'
import Write from './pages/write'
import { ArConnectProvider } from './context/useArconnect'
import History from './pages/history'

export function App() {
  return (
    <>
      <Header />
      <ArConnectProvider>
        <Router>
          <Home path="/" />
          <History path="/history" />
          <Faq path="/faq" />
          <Write path="/write" />
        </Router>
      </ArConnectProvider>
      <Footer />
    </>
  )
}
