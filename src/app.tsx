import Router from 'preact-router'
import Footer from './components/footer'
import Header from './components/header'
import Home from './pages'
import Faq from './pages/faq'
import Write from './pages/write'
import { ArConnectProvider } from './context/useArConnect'
import History from './pages/history'
import HistoryById from './pages/history-by-id'
import ErrorBoundary from './components/error-boundary';

export function App() {
  return (
    <ErrorBoundary>
      <ArConnectProvider>
        <Header />
        <Router>
          <Home path="/" />
          <History path="/history" />
          <HistoryById path="/history/:id" />
          <Faq path="/faq" />
          <Write path="/write" />
        </Router>
        <Footer />
      </ArConnectProvider>
    </ErrorBoundary>
  )
}
