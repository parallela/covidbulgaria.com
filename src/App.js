import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Home from "./components/Home";
import MapView from "./components/Map";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Privacy from "./components/Privacy";
import CookieConsent from "react-cookie-consent";


export default class App extends React.Component {

    render() {
        return (
            <main>
                <Router>
                    <Navbar/>
                    <Route path={'/'} exact component={Home}/>
                    <Route path={'/map'} component={MapView}/>
                    <Route path={'/search-city'} component={Search}/>
                    <Route path={'/privacy-policy'} component={Privacy}/>

                    <CookieConsent
                        location="bottom"
                        buttonText="Съгласен съм!"
                        cookieName="iAcceptTheCookies"
                        style={{background: "#2B373B"}}
                        buttonStyle={{color: "#4e503b", fontSize: "13px"}}
                        expires={150}
                    >
                        Използваме бисквитки ("Cookies"), за да анализираме потребителското поведение и да
                        подобрим
                        предлаганите функционалности.{" "}
                        <span style={{fontSize: "10px"}}>
                        <Link to={'/privacy-policy'}>Политика за поверителност</Link>
                    </span>
                    </CookieConsent>

                </Router>
            </main>
        )
    }

}