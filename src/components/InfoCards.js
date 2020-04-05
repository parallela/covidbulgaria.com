import React from "react";
import Moment from "react-moment";

Moment.globalLocale = 'bg';

export default class InfoCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNotLoadingData: false,
            covidStats: [],
            todayStats: []
        }
    }

    async getData() {
        await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/DateDiffCasesDataset.json',{
            method: 'GET',
        }).then(res => res.json()).then((result) => {
            this.setState({
                todayStats: result,
            })
        });
        await fetch('https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/TotalsDataset.json',{
            method: 'GET',
        }).then(res => res.json()).then((result) => {
            this.setState({
                covidStats: result,
            })
        });
        this.setState({
           isNotLoadingData: true
        });
    }

    componentDidMount() {
        this.getData();
        this.updateInterval = setInterval(this.getData.bind(this),30000);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    render() {
        const { covidStats, isNotLoadingData, todayStats} = this.state;
        if (isNotLoadingData) {
            return (
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
                                    <footer className="blockquote-footer"style={{color: 'red'}}>Общо</footer>
                                </blockquote>
                                <hr/>
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{todayStats.fatal[new Date().toISOString().slice(0,10)].cases}</h3>
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
                                        <h3>{todayStats.infected[new Date().toISOString().slice(0,10)].cases}</h3>
                                    </div>
                                    <footer className="blockquote-footer text-warning">Заразени</footer>
                                </blockquote>
                                <hr/>
                                <blockquote className="blockquote">
                                    <div className="card-text">
                                        <h3>{todayStats.cured[new Date().toISOString().slice(0,10)].cases}</h3>
                                    </div>
                                    <footer className="blockquote-footer text-success">Излекувани</footer>
                                </blockquote>
                            </div>
                            <div className="card-footer text-muted">
                                Последно обновено: <Moment fromNow date={covidStats.timestamp}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Извличане на данните... Моля изчакайте...</div>
            )
        }
    }

}