import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from './pages/Login';
import AdminIndex from './pages/AdminIndex';
const App = () => {
    return (
        <>
            <Router>
                <div>
                    <Route path="/" exact component={LoginPage}></Route>
                    <Route path="/index/" component={AdminIndex} />
                </div>
            </Router>
        </>
    )
}
export default App;