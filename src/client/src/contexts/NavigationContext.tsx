import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { useState } from "react";


type NavigationContextProviderProps = {
    children: ReactNode
};

type NavigationContextProps = {
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<string>>
};

export const NavigationContext = React.createContext<NavigationContextProps>({
    activeTab: '/',
    setActiveTab: () => {

    }
});

export const NavigationContextProvider = ({children} : NavigationContextProviderProps) => {
    const [state, setState] = useState('/')

    return (
        <NavigationContext.Provider value={{activeTab: state, setActiveTab: setState}}>
            {children}
        </NavigationContext.Provider>
    );
};