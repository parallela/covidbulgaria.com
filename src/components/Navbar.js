import React from 'react';
import {NavLink} from 'react-router-dom';

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
                <a href={'/'} className="navbar-brand">COVID-19 Bulgaria</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink
                            className={'nav-item nav-link'}
                            to="/"
                            activeClassName="active" exact
                        ><i className="fa fa-home"></i> Начало</NavLink>
                        <NavLink
                            className={'nav-item nav-link'}
                            to="/map"
                            activeClassName="active"
                        ><i className="fa fa-map"></i> Карта</NavLink>
                        <NavLink
                            className={'nav-item nav-link'}
                            to="/search-city"
                            activeClassName="active"
                        ><i className="fa fa-search"></i> Търсене</NavLink>
                    </div>
                </div>
            </nav>

        )
    }
}