import React from "react";
import { render } from "react-dom";

export default class Hover extends React.Component {
    state = {
        hovering: false,
    };

    mouseOver = () => {
        this.setState({
            hovering: true,
        });
    };

    mouseOut = () => {
        this.setState({
            hovering: false,
        });
    };

    render() {
        return (
            <div
                className="has-hovering"
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
            >
                {this.props.children(this.state.hovering)}
            </div>
        );
    }
}
