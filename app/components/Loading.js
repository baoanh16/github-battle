import React from "react";
import PropTypes from 'prop-types'


const style = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: '0',
        top: '0',
        marginTop: '100px',
        textAlign: 'center',
        width: '100%'
    }
}

export default class Loading extends React.Component {
    state = {
        content: this.props.text,
    };

    componentDidMount() {

        const {text, speed} = this.props

        this.interval = window.setInterval(() => {
            this.state.content === text + "..."
                ? this.setState({ content: text })
                : this.setState(({ content }) => ({ content: content + "." }));
        }, speed);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        return (
            <React.Fragment>
                <p style={style.content}>{this.state.content}</p>
            </React.Fragment>
        );
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}


Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}