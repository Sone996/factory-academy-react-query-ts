import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// CUSTOM SERVICES
import { AuthContext } from './Modules/AuthModule/Auth.context';
// END :: CUSTOM SERVICES
// PAGES
import Login from './Pages/Login';
// END :: PAGES
// COMPONENTS
// END :: COMPONENTS
// STYLE
import './App.scss';
// END:: STYLE

function App() {

  const [activeUser, setActiveUser] = useState(null);

  const queryCLient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  const setUser = (val: any) => {
    setActiveUser(val.data);
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden flex">
      <AuthContext.Provider value={activeUser}>
        <Router>
          <Route exact path='/login'>
            <Login setUser={setUser} />
          </Route>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
