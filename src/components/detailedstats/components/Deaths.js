import React from "react";

export default class Deaths extends React.Component {

    render() {
        return (
            <div className="col col-md-2">
                <div className="card border-dark mb-3">
                    <div className="card-header"><i className="fas fa-skull"></i> Починали / Град</div>
                    <div className="card-body city-stats-card overflow-auto text-center text-dark">
                        {this.props.cities.map((city, key) =>
                            <p key={key} className="card-text h6">
                                <span style={{color: 'red'}}>{city[1].fatal} </span> /
                                <strong style={{color: 'white'}}> {city[0]}</strong>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        )
    }

}