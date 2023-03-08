import './index.css'

import App from './App'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root') as HTMLElement)

root.render(<App />)
