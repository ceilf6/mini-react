// import { createRoot } from 'react-dom/client' // React原生的
import ReactDOM from '@/react-dom/ReactDOM'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(
//     <App />
// )
root.render(
    <div>
        test1
        <div>
            text2
            <div>
                test3
            </div>
            test4
        </div>
    </div>
)
