import React from "react";
import {Circle, CircleMarker, Map, TileLayer, Tooltip} from "react-leaflet";
import PropTypes from "prop-types";

export default class MapView extends React.Component {
    render() {
        return (
            <div className="col col-md-5">
                <div className="card">
                    <div className="card-body">
                        <Map
                            style={{height: "70vh"}}
                            center={[42.593532973742356, 26.334228312500045]}
                            zoom={6.3}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                            {this.props.cities.map((city,key) =>
                                <div key={key}>
                                    <Circle key={key+1} center={city[1].coordinates} fillColor="blue" radius={1}/>
                                    <CircleMarker key={key+2} center={city[1].coordinates} color="orange" radius={10}>
                                        <Tooltip>
                                            <strong>{city[0]}</strong>
                                            <hr />
                                            <strong>Заразени:</strong> {city[1].infected} <br />
                                            <strong>Излекувани:</strong> {city[1].cured} <br />
                                            <strong>Фатални:</strong> {city[1].fatal} <br />
                                        </Tooltip>
                                    </CircleMarker>
                                </div>
                            )}
                        </Map>
                    </div>
                </div>
            </div>
        )
    }
}
MapView.propTypes = {
    cities: PropTypes.array
}