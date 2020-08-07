import React from "react";
import {PieChart} from "react-chartkick";
import "chart.js"
import PropTypes from "prop-types";

export default class ChartGender extends React.Component {

    render() {

        return (
            <div className="col col-md-6 h-40">
                <div className="card border-dark mb-3">
                    <div className="card-header"><i className="fa fa-chart-area"></i> Графична статистика: Мъже /
                        Жени
                    </div>
                    <div className="card-body overflow-auto text-center text-dark">
                        <PieChart data={[["Мъже", this.props.statistics.men], ["Жени", this.props.statistics.women]]} />
                    </div>
                </div>
            </div>
        )
    }
}
ChartGender.propTypes = {
    statistics: PropTypes.object
}