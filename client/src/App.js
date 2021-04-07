
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layouts/Landing'
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AuthContextProvider from './contexts/AuthContext'
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
