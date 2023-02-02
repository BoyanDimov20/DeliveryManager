import React from 'react'
import ReactDOM from 'react-dom/client'
import 'dayjs/locale/bg'

import './index.css'
import Layout from './Layout';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Layout></Layout>
	</React.StrictMode>,
)
