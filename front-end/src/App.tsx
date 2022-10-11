import './App.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { IGlobalContext, UserType } from './interfaces/general_interfaces';
import GlobalProvider, { GlobalContext } from './contexts/globalContext';

// component imports
import Loading from './components/loading-component/loading';
import { Connection } from './connection';
import { USER_TYPE } from './interfaces/general_enums';

// async component imports

const Base = lazy(() => import("./components/base"));


interface IProps {
  context: IGlobalContext
}

const App = (props: IProps) => {

  // COMPONENT DID MOUNT
  useEffect(() => {

    // try to retrieve auth data from localstorage
    Connection.buildFromLocalStorage();
    if (Connection.userId !== "") {
      props.context.setUserId(parseInt(Connection.userId));
      props.context.setUserType(parseInt(Connection.userType));
    }

  }, []);

  return (
    <BrowserRouter>
      <div className="App">

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/*" element={<Base />} />
          </Routes>
        </Suspense>

      </div>
    </BrowserRouter>
  );
}

const AppWithContext = (props: any) => {
  return (
    <GlobalProvider>
      <GlobalContext.Consumer>
        {
          context => (
            <App context={context} />
          )
        }
      </GlobalContext.Consumer>
    </GlobalProvider>
  );
}

export default AppWithContext;
