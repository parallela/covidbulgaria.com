import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "./components/Home";
import MapView from "./components/Map";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Privacy from "./components/Privacy";
import {setTitle} from "./functions/TitleControl";
import Cookie from "./components/Cookie";


export default class App extends React.Component {

    componentDidMount() {
        setInterval(setTitle, 10000)
    }


    render() {
        return (
            <main>
                <Router>
                    <Navbar/>
                    <Route path={'/'} exact component={Home}/>
                    <Route path={'/map'} component={MapView}/>
                    <Route path={'/search-city'} component={Search}/>
                    <Route path={'/privacy-policy'} component={Privacy}/>
                    <Cookie />
                </Router>
            </main>
        )
    }

}