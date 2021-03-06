import React from "react";
import ParticleElement from "../ParticleElement";
import "./css/style.css"
import LeftSideCards from "./components/LeftSideCards";
import MapView from "./components/Map";
import Deaths from "./components/Deaths";
import Timer from "react-compound-timer";
import Cured from "./components/Cured";
import ChartInfected from "./components/Chart-Infected";
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
        let FetchStatsForToday = await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/DateDiffCasesDataset.json');
        let FetchCovidStats = await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/TotalsDataset.json');
        let FetchMostInfectedCities = await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json');
        let TodayChartData = await FetchStatsForToday.json();
        let DisplayChartData = [
            {
                name: 'Заразени',
                data: Object.entries(TodayChartData.infected).map(entry => [entry[0], entry[1]['cases']])

            },
            {
                name: 'Излекувани',
                data: Object.entries(TodayChartData.cured).map(entry => [entry[0], entry[1]['cases']])
            },
            {
                name: 'Починали',
                data: Object.entries(TodayChartData.fatal).map(entry => [entry[0], entry[1]['cases']])
            }
        ];


        setTimeout(async () => {
            this.setState({
                loading: false,
                covidStats: await FetchCovidStats.json(),
                chartData: DisplayChartData,
                cities: Object.entries(await FetchMostInfectedCities.json()).sort((a, b) => {
                    return b[1].infected - a[1].infected
                })
            });
        }, 1600);
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const {loading, covidStats, cities, chartData} = this.state
        console.log(chartData);
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
                            преди <Timer><Timer.Seconds/></Timer> секунди.</small>
                        <div className="row">
                            <LeftSideCards statistics={covidStats} cities={cities}/>
                            <MapView cities={cities}/>
                            <Deaths cities={cities}/>
                            <Cured cities={cities}/>
                            <ChartInfected chart={chartData}/>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}