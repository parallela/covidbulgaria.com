import React from "react";
import { LineChart } from "react-chartkick"
import "chart.js"

export default class ChartInfected extends React.Component {

    render() {
        return (
            <div className="col col-md-6 h-40">
                <div className="card border-dark mb-3">
                    <div className="card-header"><i className="fa fa-chart-area"></i> Графична статистика: Месеци /
                        Заразени
                    </div>
                    <div className="card-body overflow-auto text-center text-dark">
                        <LineChart
                            data={this.props.chart}
                            xtitle={"Засегнати"}
                            ytitle={"Дати"}
                            colors={['#f6c23e', '#1cc88a', '#e74a3b']}
                            download={{ background: '#ffffff', filename: 'covidbulgaria.com / STATS / Cases.png' }}
                           />
                    </div>
                </div>
            </div>
        )
    }
}