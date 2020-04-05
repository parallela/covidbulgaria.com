import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "./components/Home";
import MapView from "./components/Map";
import Navbar from "./components/Navbar";
import Search from "./components/Search";

export default class App extends React.Component {

    render() {
        return (
            <main>
                <Router>
                    <Navbar/>
                    <Route path={'/'} exact component={Home}/>
                    <Route path={'/map'} exact component={MapView}/>
                    <Route path={'/search-city'} exact component={Search}/>
                </Router>
            </main>
        )
    }

}