import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AppProvider from './Context/AppProvider';
import { state, combineReducers } from './Context/Reducers';
import { ProtectedRoute } from './Services/ProtectedRoute';
import { appReducer } from './Context/Reducers/App/App.reducer';
import { teacherReducer } from './Context/Reducers/Teacher/Teacher.reducer';
import { studentReducer } from './Context/Reducers/Student/Student.reducer';
// PAGES
import Login from './Pages/Login';
// END :: PAGES
// COMPONENTS
import AppLayoutNavigation from './Components/Shared/AppLayoutNavigation';
import Loader from './Components/UI/Loader';
// END :: COMPONENTS
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
    appReducer,
    teacherReducer,
    studentReducer
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
              <ProtectedRoute path='*' component={AppLayoutNavigation}></ProtectedRoute>
              <Route path="*" exact><Redirect to={{ pathname: '/login' }} /></Route>
            </Switch>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Loader />
      </div>
    </AppProvider>
  );
}

export default App;
