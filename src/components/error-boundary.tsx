import { Component } from 'preact'
import { Link } from 'preact-router'

export default class ErrorBoundary extends Component {
    state = { error: null }

    static getDerivedStateFromError(error: any) {
        return { error: error.message }
    }

    componentDidCatch(error: any) {
        console.error(error)
        this.setState({ error: error.message })
    }

    render() {
        if (this.state.error) {
            return (
                <div className="min-h-screen bg-white dark:bg-gray-800 flex flex-col justify-center items-center">
                    <div className="w-1/2 mx-auto text-center p-8 bg-white dark:bg-gray-800 shadow-md rounded">
                        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Error</h1>
                        <p className="text-gray-700 dark:text-gray-300">
                            Something went wrong: {this.state.error}
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/"
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-medium transition"
                            >
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}