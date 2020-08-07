import React from "react";
import PropTypes from 'prop-types';

export default class LeftSideCards extends React.Component {
    render() {
        return (
            <div className="col col-md-3">
                <div className="card border-dark mb-3">
                    <div className="card-header"><i className="fas fa-disease"></i> Общо заразени</div>
                    <div className="card-body text-center text-dark">
                        <p className="card-text h3" style={{color: 'red'}}>{this.props.statistics.infected}</p>
                    </div>
                </div>
                <div className="card border-dark mb-3">
                    <div className="card-header"><i className="fas fa-disease"></i> Най-засегнат град</div>
                    <div className="card-body text-center text-dark">
                        <p className="card-text h3"
                           style={{color: 'red'}}>{this.props.cities[0][0]}</p>
                        <p className="h6">Заразени: <span
                            style={{color: 'red'}}>{this.props.cities[0][1]["infected"]}</span></p>
                    </div>
                </div>
                <div className="card border-dark mb-3">
                    <div className="card-header"><i className="fas fa-disease"></i> Заразени / Град</div>
                    <div className="card-body cities-card overflow-auto text-center text-dark">
                        {this.props.cities.map((city, key) =>
                            <p key={key} className="card-text h6">
                                <span style={{color: 'red'}}>{city[1].infected}</span> /
                                <strong style={{color: 'white'}}> {city[0]}</strong>
                            </p>
                        )}
                    </div>
                </div>
            </div>

        )
    }
}
LeftSideCards.propTypes = {
    cities: PropTypes.array
}