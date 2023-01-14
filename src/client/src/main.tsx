import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'
import Navigation from './components/Navigation/Navigation';
import './index.css'
import EditUser from './pages/Edit/EditUser';
import List from './pages/Lists/List';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';


const queryClient = new QueryClient()

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/register",
		element: <Register />
	},
	{
		path: "/list",
		element: <List />
	},
	{
		path: '/editUser/:id',
		element: <EditUser />
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
)
