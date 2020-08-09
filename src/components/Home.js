import React from 'react';
import InfoCards from "./InfoCards";
import AlertCard from "./AlertCard";
import ParticleElement from "./ParticleElement";

export default class Home extends React.Component {

    render() {
        return (
            <div id={'home'}>
                <ParticleElement />
                <div className="container mt-5 mb-2">/
                    <InfoCards/>
                    <AlertCard />
                </div>
            </div>
        )
    }

}