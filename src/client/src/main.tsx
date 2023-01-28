import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'
import Navigation from './components/Navigation/Navigation';
import './index.css'
import CreateOffice from './pages/Create/CreateOffice';
import CreatePackage from './pages/Create/CreatePackage';
import EditPackage from './pages/Edit/EditPackage';
import EditUser from './pages/Edit/EditUser';
import ListIncome from './pages/Lists/ListIncome';
import ListPackages from './pages/Lists/ListPackages';
import ListUsers from './pages/Lists/ListUsers';
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
		path: "/users",
		element: <ListUsers />
	},
	{
		path: '/editUser/:id',
		element: <EditUser />
	},
	{
		path: '/packages',
		element: <ListPackages />
	},
	{
		path: '/editPackage/:id',
		element: <EditPackage />
	},
	{
		path: '/createPackage',
		element: <CreatePackage />
	},
	{
		path: '/registerOffice',
		element: <CreateOffice />
	},
	{
		path: '/listIncome',
		element: <ListIncome />
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
)
