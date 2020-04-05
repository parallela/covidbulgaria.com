import React from "react";
import {Map, TileLayer, Tooltip, Circle, CircleMarker} from "react-leaflet";

var position = [42.670, 26.082];


export default class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            geoInfo: {},
        }
    }

    async getData() {
        await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json', {
            method: 'GET',
        }).then(res => res.json()).then((result) => {
            this.setState({
                geoInfo: result,
            });
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const {geoInfo} = this.state;
        return (
            <div>
                <Map
                    style={{height: "100vh"}}
                    center={position}
                    zoom={7}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>

                    { Object.entries(geoInfo).map(([city, data]) => (
                        <div>
                            <Circle key={city} center={data.coordinates} fillColor="blue" radius={100}/>
                            <CircleMarker key={city} center={data.coordinates} color="orange" radius={20}>
                                <Tooltip>
                                    <strong>{city}</strong>
                                    <hr />
                                    <strong>Заразени:</strong> {data.infected} <br />
                                    <strong>Излекувани:</strong> {data.cured} <br />
                                    <strong>Фатални:</strong> {data.fatal} <br />
                                </Tooltip>
                            </CircleMarker>
                        </div>
                    ))}
                </Map>
            </div>
        )
    }
}