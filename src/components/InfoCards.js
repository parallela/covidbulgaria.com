import React from "react";
import Moment from "react-moment";
import LoaderAnimation from "./detailedstats/components/LoaderAnimation";

Moment.globalLocale = 'bg';

export default class InfoCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            covidStats: [],
            todayStats: [],
            mostInfectedCity: [],
        }
    }

    async getData() {
        let FetchStatsForToday = await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/DateDiffCasesDataset.json');
        let FetchCovidStats = await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/TotalsDataset.json');
        let FetchMostInfectedCity = await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json');


        setTimeout(async () => {
            this.setState({
                loading: false,
                covidStats: await FetchCovidStats.json(),
                todayStats: await FetchStatsForToday.json(),
                mostInfectedCity: Object.entries(await FetchMostInfectedCity.json()).sort((a, b) => {
                    return b[1].infected - a[1].infected
                })[0]
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
        const {covidStats, loading, todayStats, mostInfectedCity} = this.state;
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
                                Последно обновено: <Moment fromNow date={covidStats.timestamp}/>
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
                                Последно обновено: <Moment fromNow date={covidStats.timestamp}/>
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
                                Последно обновено: <Moment fromNow date={covidStats.timestamp}/>
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
                                    С {
                                    todayStats.pcr_tests[new Date().toISOString().slice(0, 10)].cases - todayStats.pcr_tests[new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10)].cases
                                } направени теста повече от вчера
                                </small> <br />
                                Последно обновено: <Moment fromNow date={covidStats.timestamp}/>
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
                                Последно обновено: <Moment fromNow date={covidStats.timestamp}/>
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
                                Последно обновено: <Moment fromNow date={covidStats.timestamp}/>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}