import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Result from "./Result";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";

function Instruction() {
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <div className="ui three cards instruction-wrap stackable">
                    <a className="card">
                        <div className={`image ${theme}`}>
                            <i className="icon users teal"></i>
                        </div>
                        <div className={`content ${theme}`}>
                            Enter 2 Github users
                        </div>
                    </a>
                    <a className="card">
                        <div className={`image ${theme}`}>
                            <i className="icon fighter jet red"></i>
                        </div>
                        <div className={`content ${theme}`}>Battle</div>
                    </a>
                    <a className="card">
                        <div className={`image ${theme}`}>
                            <i className="icon chess king yellow"></i>
                        </div>
                        <div className={`content ${theme}`}>See the winner</div>
                    </a>
                </div>
            )}
        </ThemeConsumer>
    );
}

class PlayerInput extends React.Component {
    state = {
        username: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.username);
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value,
        });
    }

    render() {
        return (
            <ThemeConsumer>
                {({theme}) => (
                    <form onSubmit={this.handleSubmit}>
                        <label
                            style={{ display: "block", marginBottom: "5px" }}
                        >
                            {this.props.label}
                        </label>
                        <div className="ui action input fluid">
                            <input
                                type="text"
                                placeholder="Github user"
                                value={this.state.username.trim()}
                                onChange={this.handleChange}
                                className={theme}
                            />
                            <button
                                className="ui button"
                                type="submit"
                                disabled={!this.state.username}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </ThemeConsumer>
        );
    }
}

PlayerInput.propTypes = {
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const PlayerPreview = ({ username, onReset, label }) => {
    return (
        <div className="card ui fluid">
            <div className="content">
                <img
                    className="right floated mini ui image"
                    src={`https://github.com/${username}.png?size=200`}
                />
                <a className="header">{username}</a>
            </div>
            <div className="extra content">
                <div className="ui basic red button" onClick={() => onReset()}>
                    Reset
                </div>
            </div>
        </div>
    );
};

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default class Battle extends React.Component {
    state = {
        playerOne: null,
        playerTwo: null,
        battle: false,
    };

    handleSubmit = (id, player) => {
        this.setState({
            [id]: player,
        });
    }

    handleReset = (id) => {
        this.setState({
            [id]: null,
        });
    }

    render() {
        const { playerOne, playerTwo, battle } = this.state;
        if (battle) {
            return (
                <React.Fragment>
                    <Result
                        playerOne={playerOne}
                        playerTwo={playerTwo}
                        onReset={() =>
                            this.setState({
                                playerOne: null,
                                playerTwo: null,
                                battle: false,
                            })
                        }
                    />
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <Instruction />
                <div
                    className="ui grid stackable"
                    style={{ marginTop: "30px" }}
                >
                    <div className="column eight wide">
                        <PlayerInput
                            label="Player One"
                            onSubmit={(player) =>
                                this.handleSubmit("playerOne", player)
                            }
                        />
                        {playerOne !== null && (
                            <PlayerPreview
                                username={playerOne}
                                label="Player One"
                                onReset={() => this.handleReset("playerOne")}
                            />
                        )}
                    </div>
                    <div className="column eight wide">
                        <PlayerInput
                            label="Player Two"
                            onSubmit={(player) =>
                                this.handleSubmit("playerTwo", player)
                            }
                        />
                        {playerTwo !== null && (
                            <PlayerPreview
                                username={playerTwo}
                                label="Player Two"
                                onReset={() => this.handleReset("playerTwo")}
                            />
                        )}
                    </div>
                </div>
                {playerOne !== null && playerTwo !== null && (
                    <div className="ui header aligned center">
                        <Link to={{
                            pathname: "/battle/result",
                            search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                            }} className="positive ui button">Battle</Link>
                        {/* <button
                            className="positive ui button"
                            onClick={() => this.setState({ battle: true })}
                        >
                            Let's battle
                        </button> */}
                    </div>
                )}
            </React.Fragment>
        );
    }
}
