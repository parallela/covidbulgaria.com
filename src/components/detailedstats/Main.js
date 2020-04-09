import React from "react";
import ParticleElement from "../ParticleElement";
import "./css/style.css"
import LeftSideCards from "./components/LeftSideCards";
import MapView from "./components/Map";
import Deaths from "./components/Deaths";
import Timer from "react-compound-timer";
import Cured from "./components/Cured";
import ChartInfected from "./components/Chart-Infected";
import ChartGender from "./components/Chart-Gender";
import LoaderAnimation from "./components/LoaderAnimation";


export default class DetailedStats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            covidStats: [],
            mostInfectedCity: [],
            chartData: [],
            loading: true
        }
    }

    async getData() {
        await fetch("https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/TotalsDataset.json", {
            method: 'GET'
        }).then(res => res.json()).then((result) => {
            this.setState({
                covidStats: result,
            });
        });
        await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json', {
            method: 'GET',
        }).then(res => res.json()).then((result) => {
            this.setState({
                cities: Object.entries(result).sort((a, b) => {
                    return b[1].infected - a[1].infected
                })
            })
        });
        await fetch("https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/DateCasesDataset.json")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    chartData: Object.fromEntries(Object.entries(result.infected).map(entry => [entry[0], entry[1].cases]))
                });
            })
        this.setState({
            loading: false
        });
    }

    componentDidMount() {
        this.getData();
    }


    render() {
        const {loading, covidStats, cities, chartData} = this.state
        return (
            <div id="DetailedStats">
                <ParticleElement/>
                <div className="container-fluid mb-2 mt-4 ">
                    {loading &&
                    <LoaderAnimation loading={loading}/>
                    }
                    {!loading &&
                    <div id="detailed-statistic">
                        <small style={{color: 'white'}}>Обновено
                            преди: <Timer><Timer.Seconds/></Timer> секунди.</small>
                        <div className="row">
                            <LeftSideCards statistics={covidStats} cities={cities}/>
                            <MapView cities={cities}/>
                            <Deaths cities={cities}/>
                            <Cured cities={cities}/>
                            <ChartInfected chart={chartData}/>
                            <ChartGender statistics={covidStats}/>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}