import React from "react";
import { GlobalContext } from "../../contexts/globalContext";
import "./deanHome.css";

let DeanHome = () => {
    return (
        <GlobalContext.Consumer>
            {context => (
                <div className="admin-home">
                    <h1>This is the dean home page!</h1>
                </div>
            )}
        </GlobalContext.Consumer>
    );
}

export default DeanHome;