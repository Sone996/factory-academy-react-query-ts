import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
//import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// CONTEXT
import AppProvider from './Context/AppProvider';
// END :: CONTEXT
// CUSTOM SERVICES
import { state, combineReducers } from './Context/Reducers';
// END :: CUSTOM SERVICES
// PAGES
import Login from './Pages/Login';
import TeacherHome from './Pages/Teacher/TeacherHome';
// END :: PAGES
// COMPONENTS
// END :: COMPONENTS
// REDUCERS
import { appReducer } from './Context/Reducers/App/App.reducer';
// END :: REDUCERS
// STYLE
import './App.scss';
// END:: STYLE

function App() {


  const queryCLient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  const reducers = combineReducers({
    appReducer
  })

  return (
    <AppProvider reducer={reducers} state={state}>
      <div className="relative w-screen h-screen overflow-hidden flex">
        <QueryClientProvider client={queryCLient}>
          <Router>
            <Switch>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/teacher-home'>
                <TeacherHome />
              </Route>
            </Switch>
          </Router>
        </QueryClientProvider>
      </div>
    </AppProvider>
  );
}

export default App;
