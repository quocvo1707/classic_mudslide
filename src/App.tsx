import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient()

const App = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path='/classic_mudslide' element={<Home />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App
