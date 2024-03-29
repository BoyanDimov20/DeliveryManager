import { MouseEvent, useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { NavigationContext } from "../../contexts/NavigationContext";
import { useIdentity } from "../../services/authService";


const Navigation = () => {
    const navigate = useNavigate();
    const identity = useIdentity();
    const queryClient = useQueryClient();
    const [mobileNavVisible, setMobileNavVisible] = useState(false);
    const navigationContext = useContext(NavigationContext);

    const isToggled = () => {
        if (!mobileNavVisible) {
            return 'hidden';
        }

        return '';
    }

    const isActive = (tab: string) => {
        if (tab == navigationContext.activeTab) {
            return 'border rounded-2xl'
        }
        return '';
    }

    const signOut = (event: MouseEvent) => {
        event.preventDefault();
        fetch('/api/auth/logout').then(x => {
            if (x.ok) {
                queryClient.invalidateQueries();
                navigate('/');
            }
        })
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6" onClick={() => navigate("/")}>
                <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
                <span className="font-semibold text-xl tracking-tight">Delivery Manager</span>
            </div>
            <div className="block lg:hidden">
                <button onClick={() => setMobileNavVisible(prev => !prev)} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
                <div className={`absolute border w-full top-20 left-0 transition-height h-full bg-teal-500 z-30 ${isToggled()}`}>
                    <div className="ml-3">
                        {identity?.isAuthenticated ?
                            <>
                                <div className="block mt-4 p-2 lg:inline-block lg:mt-0 text-teal-100 font-medium mr-4">Здравей, {identity.username}</div>
                                <Link onClick={() => navigationContext.setActiveTab('/packages')} to="/packages" className={`block ${isActive("/packages")} mt-4 p-2 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4`}>Пратки</Link>
                            </>
                            : null
                        }
                        {identity?.isAdmin ?
                            <>
                                <Link to="/users" onClick={() => navigationContext.setActiveTab('/users')} className={`block ${isActive("/users")} mt-4 p-2 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4`}>Потребители</Link>
                                <Link to="/listIncome" onClick={() => navigationContext.setActiveTab('/listIncome')} className={`block ${isActive("/listIncome")} mt-4 p-2 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4`}>Справка</Link>
                                <Link to="/registerOffice" onClick={() => navigationContext.setActiveTab('/registerOffice')} className={`block ${isActive("/registerOffice")} mt-4 p-2 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4`}>Регистриране на офис</Link>
                            </>
                            : <></>
                        }
                        {identity?.isAuthenticated ?
                            <a onClick={signOut} className="block mt-4 p-2 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Изход</a>
                            :
                            <>
                                <Link to="/login" onClick={() => navigationContext.setActiveTab('/login')} className={`block ${isActive('/login')} mt-4 p-2 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4`}>
                                    Вход
                                </Link>
                                <Link to="/register" onClick={() => navigationContext.setActiveTab('/register')} className={`block ${isActive('/register')} mt-4 p-2 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4`}>
                                    Регистрация
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </div>

            <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden">
                <div className="text-sm lg:flex-grow">
                    {identity?.isAuthenticated ?
                        <>
                            <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 font-medium mr-4">Здравей, {identity.username}</div>
                            <Link to="/packages" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer mr-4">Пратки</Link>
                        </>
                        : null
                    }
                    {identity?.isAdmin ?
                        <>
                            <Link to="/users" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer mr-4">Потребители</Link>
                            <Link to="/listIncome" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer mr-4">Справки</Link>
                            <Link to="/registerOffice" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer mr-4">Регистриране на офис</Link>
                        </>
                        : <></>
                    }

                    {!identity?.isAuthenticated ?
                        <>
                            <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer mr-4">
                                Вход
                            </Link>
                            <Link to="/register" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer mr-4">
                                Регистрация
                            </Link>
                        </>
                        : null
                    }
                </div>
                {identity?.isAuthenticated ?
                    <div>
                        <a onClick={signOut} className="inline-block cursor-pointer text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Изход</a>
                    </div>
                    : null
                }

            </div>
        </nav>
    );
};


export default Navigation;