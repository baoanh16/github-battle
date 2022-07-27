import React from "react";
import { battle } from "../utils/api";
import Card from "../components/Card";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
import ToolTip from "./ToolTip";
import queryString from "query-string";
import { Link } from 'react-router-dom'

function ProfileList({ profile }) {
    return (
        <div className="extra content">
            <ToolTip text="Username">
                <i className="id badge icon"></i>
                {profile.login}
            </ToolTip>
            <ToolTip text="Location">
                <i className="globe icon"></i>
                {profile.location || "N/A"}
            </ToolTip>
            <p>
                <i className="users icon"></i>
                {profile.followers} followers
            </p>
            <p>
                <i className="user plus icon"></i>
                {profile.following} followings
            </p>
            <p>
                <i className="code branch icon"></i>
                {profile.public_repos} repositories
            </p>
        </div>
    );
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default class Result extends React.Component {
    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true,
    };

    componentDidMount() {
        const { playerOne, playerTwo } = queryString.parse(this.props.location.search)

        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false,
                });
            })
            .catch(({ message }) => {
                this.setState({
                    error: message,
                    loading: false,
                });
            });
    }

    render() {
        const { winner, loser, loading, error } = this.state;
        if (loading) {
            return <Loading text="Data is fetching" speed={100} />;
        }

        if (error) {
            return (
                <div className="ui negative message">
                    <div className="header">Error</div>
                    <p>{error}</p>
                </div>
            );
        }
        return (
            <React.Fragment>
                <h1 className="ui huge header aligned center">Result</h1>
                <div
                    className="ui three stackable cards"
                    style={{ justifyContent: "space-around" }}
                >
                    <Card
                        header={
                            <div
                                className="ui blue ribbon label huge"
                                style={{ top: "1rem", position: "absolute" }}
                            >
                                Winner
                            </div>
                        }
                        subheader={`Score: ${winner.score}`}
                        avatar={winner.profile.avatar_url}
                        href={winner.profile.html_url}
                        name={winner.profile.name}
                        bio={winner.profile.bio}
                        children={<ProfileList profile={winner.profile} />}
                    />
                    <Card
                        header={
                            <div
                                className="ui blue ribbon label huge"
                                style={{ top: "1rem", position: "absolute" }}
                            >
                                Loser
                            </div>
                        }
                        subheader={`Score: ${loser.score}`}
                        avatar={loser.profile.avatar_url}
                        href={loser.profile.html_url}
                        name={loser.profile.name}
                        bio={loser.profile.bio}
                        children={<ProfileList profile={loser.profile} />}
                    />
                </div>
                <Link className="negative ui button" to='/battle'>Reset </Link>

                {/* <button
                    className="negative ui button"
                    style={{ marginTop: "30px" }}
                    onClick={this.props.onReset}
                >
                    Reset
                </button> */}
            </React.Fragment>
        );
    }
}

// Result.propTypes = {
//     onReset: PropTypes.func.isRequired
// };
