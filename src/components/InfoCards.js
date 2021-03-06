import React from "react";
import moment from "moment";
import LoaderAnimation from "./detailedstats/components/LoaderAnimation";

export default class InfoCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            covidStats: [],
            todayStats: [],
            mostInfectedCity: [],
            calcPcrTest: 0,
            deathPercentages: 0,
        }
    }

    getPercentBetweenTwoNumbers(number, number2) {
        let firstNumberPercent = number / 100;
        let calcPercent = number2 / firstNumberPercent;

        return calcPercent;
    }

    async getData() {
        let FetchStatsForToday = await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/DateDiffCasesDataset.json');
        let FetchCovidStats = await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/TotalsDataset.json');
        let FetchMostInfectedCity = await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json');
        let TodayStats = await FetchStatsForToday.json();
        let CovidStats = await FetchCovidStats.json();
        let MostInfectedCity = await FetchMostInfectedCity.json();

        let todayPcrTests = TodayStats.pcr_tests[new Date().toISOString().slice(0, 10)].cases;
        let yestardayPcrTests = TodayStats.pcr_tests[new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10)].cases;
        let CalcPcrTests = Math.abs(todayPcrTests - yestardayPcrTests);
        let DeathPercentages = this.getPercentBetweenTwoNumbers(CovidStats.infected, CovidStats.fatal)

        setTimeout(async () => {
            this.setState({
                loading: false,
                covidStats: CovidStats,
                todayStats: TodayStats,
                mostInfectedCity: Object.entries(MostInfectedCity).sort((a, b) => {
                    return b[1].infected - a[1].infected
                })[0],
                calcPcrTests: Math.abs(CalcPcrTests),
                deathPercentages: DeathPercentages
            });
        }, 1600);
    }

    componentDidMount() {
        this.getData();
        this.updateInterval = setInterval(this.getData.bind(this), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    render() {
        const {covidStats, loading, todayStats, mostInfectedCity, calcPcrTests, deathPercentages} = this.state;

        return (
            <div id="stats">
                {loading &&
                <LoaderAnimation/>
                }
                {!loading &&
                <div className="row">
                    <div className="col-md-4 mt-3">
                        <div className="card text-center">
                            <div className="card-header">
                                <i className="fas fa-clock"></i> Последни статистики
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{covidStats.infected}</h3>
                                    </div>
                                    <footer className="blockquote-footer text-warning">Заразени</footer>
                                </blockquote>
                                <hr/>
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{covidStats.cured}</h3>
                                    </div>
                                    <footer className="blockquote-footer text-success">Излекувани</footer>
                                </blockquote>
                            </div>
                            <div className="card-footer text-muted">
                                <small>{deathPercentages.toFixed(2)}% от заразените са починали</small> <br/>
                                Последно обновено: {moment(covidStats.timestamp, 'HH:mm A').startOf('day').fromNow()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card text-center">
                            <div className="card-header" style={{color: 'red'}}>
                                <i className="fas fa-skull-crossbones"></i> Починали от вируса
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{covidStats.fatal}</h3>
                                    </div>
                                    <footer className="blockquote-footer" style={{color: 'red'}}>Общо</footer>
                                </blockquote>
                                <hr/>
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{todayStats.fatal[new Date().toISOString().slice(0, 10)].cases}</h3>
                                    </div>
                                    <footer className="blockquote-footer" style={{color: 'red'}}>Днес</footer>
                                </blockquote>
                            </div>
                            <div className="card-footer text-muted">
                                Последно обновено: {moment(covidStats.timestamp, 'HH:mm A').startOf('day').fromNow()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card text-center">
                            <div className="card-header">
                                <i className="fas fa-calendar-day"></i> Заразени / Излекувани <strong>днес</strong>
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{todayStats.infected[new Date().toISOString().slice(0, 10)].cases}</h3>
                                    </div>
                                    <footer className="blockquote-footer text-warning">Заразени</footer>
                                </blockquote>
                                <hr/>
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{todayStats.cured[new Date().toISOString().slice(0, 10)].cases}</h3>
                                    </div>
                                    <footer className="blockquote-footer text-success">Излекувани</footer>
                                </blockquote>
                            </div>
                            <div className="card-footer text-muted">
                                Последно обновено: {moment(covidStats.timestamp, 'HH:mm A').startOf('day').fromNow()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card text-center">
                            <div className="card-header">
                                <i className="fas fa-prescription-bottle"></i> Направени PCR тестове
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{covidStats.pcr_tests}</h3>
                                    </div>
                                    <footer className="blockquote-footer">Общо</footer>
                                </blockquote>
                                <hr/>
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{todayStats.pcr_tests[new Date().toISOString().slice(0, 10)].cases}</h3>
                                    </div>
                                    <footer className="blockquote-footer">За последното денонощие</footer>

                                </blockquote>
                            </div>
                            <div className="card-footer text-muted">
                                <small>
                                    С {calcPcrTests} направени теста повече от вчера
                                </small> <br/>
                                Последно обновено: {moment(covidStats.timestamp, 'HH:mm A').startOf('day').fromNow()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card text-center">
                            <div className="card-header">
                                <i className="fas fa-plus"></i> Лечение
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{covidStats.hospitalized}</h3>
                                    </div>
                                    <footer className="blockquote-footer text-success">Хоспитализирани</footer>
                                </blockquote>
                                <hr/>
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{covidStats.intensive_care}</h3>
                                    </div>
                                    <footer className="blockquote-footer text-success">На интензивно лечение</footer>
                                </blockquote>
                            </div>
                            <div className="card-footer text-muted">
                                Последно обновено: {moment(covidStats.timestamp, 'HH:mm A').startOf('day').fromNow()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="card text-center">
                            <div className="card-header">
                                <i className="fas fa-list"></i> Други статистики
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{covidStats.medical_staff}</h3>
                                    </div>
                                    <footer className="blockquote-footer" style={{color: 'red'}}>Засегнати
                                        медицински лица
                                    </footer>
                                </blockquote>
                                <hr/>
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{mostInfectedCity[0]}</h3>
                                        <small><strong>Заразени:</strong> {mostInfectedCity[1]["infected"]}</small>
                                    </div>
                                    <footer className="blockquote-footer" style={{color: 'red'}}>Най-засегнат град
                                    </footer>
                                </blockquote>
                            </div>
                            <div className="card-footer text-muted">
                                Последно обновено: {moment(covidStats.timestamp, 'HH:mm A').startOf('day').fromNow()}
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}