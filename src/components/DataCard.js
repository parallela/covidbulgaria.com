import React from "react";
import {Map, TileLayer} from "react-leaflet";
import PropTypes from 'prop-types';

export default class DataCard extends React.Component {
    render() {
        return (
            <div className={'d-flex justify-content-center'}>
                <div className="card col-md-4 mt-5">
                    <div className="card-body">
                        <Map
                            style={{height: "150px", width: "100%"}}
                            center={this.props.city.coordinates}
                            zoom={12}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                        </Map>
                    </div>
                    <div className="text-center">
                    <h5><strong>Заразени:</strong> {this.props.city.infected}</h5>
                    <h5><strong className={'text-success'}>Излекувани:</strong> {this.props.city.cured}</h5>
                    <h5><strong style={{color: 'red'}}>Фатални:</strong> {this.props.city.fatal}</h5>
                    </div>
                </div>
            </div>
        );
    }
}

DataCard.propTypes = {
    city: PropTypes.object
}