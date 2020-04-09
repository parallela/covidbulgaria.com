import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

export default class LoaderAnimation extends React.Component {
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <PropagateLoader
                    size={10}
                    color={"#bfbfbf"}
                    loading={this.props.loading}
                />
            </div>
        )
    }
}