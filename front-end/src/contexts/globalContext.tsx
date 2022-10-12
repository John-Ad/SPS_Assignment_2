
//----------------------------------
//     REACT IMPORTS
//----------------------------------

import React, { createContext, useState, FC, useEffect } from "react";
import { IGlobalContext, IResponse, IUser, UserType } from "../interfaces/general_interfaces";
import { errorToast } from "../components/alert-components/toasts";
import { Connection } from "../connection";


//----------------------------------
//     DEFAULT CONTEXT VALUES
//----------------------------------

const defaultContextValues: IGlobalContext = {
    isMobile: true,

    userId: 0,
    setUserId: (newUserId) => { },

    userType: UserType.PUBLIC,
    setUserType: () => { },

    token: "",
    setToken: () => { },

    logout: () => { }
};


//----------------------------------
//     CREATE CONTEXT
//----------------------------------

export const GlobalContext = createContext<IGlobalContext>(
    defaultContextValues
);


//----------------------------------
//     CREATE INTERFACES
//----------------------------------
interface IProps {
    children: React.ReactNode
}

//----------------------------------
//     CREATE COMPONENT
//----------------------------------

const GlobalProvider: FC<IProps> = ({ children }) => {

    //-------------------------
    //     USE STATE
    //-------------------------
    const [isMobile, setIsMobile] = useState<boolean>(defaultContextValues.isMobile);

    const [userId, setUserId] = useState<number>(defaultContextValues.userId);
    const [userType, setUserType] = useState<UserType>(defaultContextValues.userType);
    const [token, setToken] = useState<string>(defaultContextValues.token);

    //-------------------------------
    //     COMPONENT DID MOUNT
    //-------------------------------
    useEffect(() => {

        // check if mobile
        checkIfMobile();

    }, []);


    //---------------------------
    //     CHECK IF MOBILE
    //---------------------------
    const checkIfMobile = () => {
        const width = window.innerWidth;
        if (width <= 1100) {
            setIsMobile(true);
            return;
        }

        setIsMobile(false);
    }

    //--------------------------------
    //          LOGOUT
    //--------------------------------
    const logout = () => {
        // clear local storage
        Connection.clearLocalStorage();

        // update context
        setUserId(0);
        setUserType(0);
        setToken("");
    }

    //-------------------------
    //     RETURN METHOD
    //-------------------------

    return (

        //-------------------------
        //     WRAP IN PROVIDER
        //-------------------------

        <GlobalContext.Provider value={{
            isMobile: isMobile,

            userId: userId,
            setUserId: setUserId,

            userType: userType,
            setUserType: setUserType,

            token: token,
            setToken: setToken,

            logout: logout
        }}>
            {children}
        </GlobalContext.Provider >

    );

};

export default GlobalProvider;
