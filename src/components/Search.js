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
            cityData: [],
            loading: false,
            showCard: false,
        };

    };

    _handleSearch = (query) => {
        console.log(query);

        let queryToUpperCase = query[0].toUpperCase() + query.substr(1).toLowerCase();

        setTimeout(() => {
            this.getCityData(queryToUpperCase);
        }, 1700);
        this.setState({loading: true})
    };


    async getCityData(city) {
        let ShowCardInformation = false;
        let FetchCurrentCity = await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json');
        let FetchAllCities = await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json');
        let CurrentCityToJson = await FetchCurrentCity.json();

        if (CurrentCityToJson[city] === undefined) {
            ShowCardInformation = false;
        } else {
            ShowCardInformation = true
        }

        this.setState({
            options: Object.keys(await FetchAllCities.json()),
            cityData: CurrentCityToJson[city],
            loading: false,
            showCard: ShowCardInformation
        })


    }

    componentDidMount() {
        this.getCityData();
    }

    render() {
        const {cityData, showCard, loading} = this.state;
        return (
            <div id="search">
                <ParticleElement/>
                <div className="container mt-5 mb-3">


                    <h3>Вижте информация за вашия град:</h3>

                    <AsyncTypeahead
                        isLoading={loading}
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