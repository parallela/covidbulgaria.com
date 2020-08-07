import React from "react";
import PropTypes from "prop-types";

export default class Cured extends React.Component{

    render() {
        return (
            <div className="col col-md-2">
                <div className="card border-dark mb-3">
                    <div className="card-header"><i className="fas fa-plus"></i> Излек.. / Град</div>
                    <div className="card-body city-stats-card overflow-auto text-center text-dark">
                        {this.props.cities.map((city,key) =>
                            <p key={key} className="card-text h6">
                                <span style={{color: 'green'}}>{city[1].cured} </span> /
                                <strong style={{color: 'white'}}> {city[0]}</strong>
                            </p>
                        )}

                    </div>
                </div>
            </div>
        )
    }
}
Cured.propTypes = {
    cities: PropTypes.array
}