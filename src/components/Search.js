import React from "react";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import DataCard from "./DataCard";
import ParticleElement from "./ParticleElement";

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
            isLoading: false,
            cityData: [],
            showCard: false,
        };

    };

    _handleSearch = (query) => {
        setTimeout(() => {
            this.getCityData(query)
        },1000);
        this.setState({isLoading: true})
    };

    async getCityData(city) {
        await fetch('https://raw.giubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json', {
            method: 'GET',
        }).then(res => res.json()).then((result) => {
            if (result[city] === undefined) {
                this.setState({showCard: false});
            } else {
                this.setState({
                    cityData: result[city],
                    isLoading: false,
                    showCard: true,
                });
            }
        });
    }

    async getCitiesList() {
        await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json', {
            method: 'GET',
        }).then(res => res.json()).then((result) => {
            this.setState({
                options: Object.keys(result),
            });
        });
    }

    componentDidMount() {
        this.getCitiesList();
    }

    render() {
        const {cityData, showCard} = this.state;
        return (
            <div id="search">
                <ParticleElement/>
                <div className="container mt-5 mb-3">


                    <h3>Вижте информация за вашия град:</h3>

                    <AsyncTypeahead
                        {...this.state}
                        id="async-city-search"
                        labelKey="cityname"
                        minLength={1}
                        onSearch={this._handleSearch}
                        onChange={this._handleSearch}
                        placeholder="Името на града Ви..."
                    />

                    {showCard &&
                    <DataCard city={cityData}/>
                    }

                </div>
            </div>
        );
    }
}