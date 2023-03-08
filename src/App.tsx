import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Home from './pages/Home'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient()

const App = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path='/eucalyptus' element={<Home />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App
