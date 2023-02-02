import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App'
import CreateOffice from './pages/Create/CreateOffice';
import CreatePackage from './pages/Create/CreatePackage';
import EditPackage from './pages/Edit/EditPackage';
import EditUser from './pages/Edit/EditUser';
import ListIncome from './pages/Lists/ListIncome';
import ListPackages from './pages/Lists/ListPackages';
import ListUsers from './pages/Lists/ListUsers';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { NavigationContextProvider } from './contexts/NavigationContext';
import Home from './pages/Home/Home';

const queryClient = new QueryClient()

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
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

const Layout = () => {


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="bg">
            <QueryClientProvider client={queryClient}>
                <NavigationContextProvider>
                    <RouterProvider router={router} />
                </NavigationContextProvider>
            </QueryClientProvider>
        </LocalizationProvider>
    );
};


export default Layout;