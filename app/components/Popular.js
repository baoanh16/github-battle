import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api.js";
import Card from "../components/Card";
import Loading from "../components/Loading";


function LanguageNav({ selected, onUpdateLanguage }) {
    const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

    return (
        <div className="ui menu">
            {languages.map((language) => (
                <a
                    className={
                        language === selected ? "ui item active" : "ui item"
                    }
                    onClick={() => onUpdateLanguage(language)}
                    key={language}
                >
                    {language}
                </a>
            ))}
        </div>
    );
}

LanguageNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func,
};

function GridView({ repos }) {
    return (
        <div className="ui four cards stackable doubling ">
            {repos.map((item) => (
                <Card
                    avatar={item.owner.avatar_url}
                    href={item.html_url}
                    name={item.name}
                    bio={item.description}
                    children={
                        <div className="extra content">
                            <p>
                                <i className="star icon"></i>
                                {item.stargazers_count} stars
                            </p>
                            <p>
                                <i className="code branch icon"></i>
                                {item.forks} forks
                            </p>
                            <p>
                                <i className="exclamation triangle icon"></i>
                                {item.open_issues} issues
                            </p>
                        </div>
                    }
                    key={item.id}
                />
            ))}
        </div>
    );
}

GridView.propTypes = {
    repos: PropTypes.array.isRequired,
};

export default class Popular extends React.Component {
    state = {
        selectedLanguage: "All",
        repos: {},
        error: null,
    };

    componentDidMount() {
        this.updateSelectedLanguage(this.state.selectedLanguage);
    }

    updateSelectedLanguage = (selectedLanguage) => {
        this.setState({
            selectedLanguage,
            error: null,
        });

        if (!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({ prevState }) => ({
                        repos: {
                            ...prevState,
                            [selectedLanguage]: data,
                        },
                    }));
                })
                .catch(() => {
                    console.warn("Error fetching repos: ", error);
                    this.setState({
                        error: `There was an error fetching the repositories`,
                    });
                });
        }
    }

    isLoading = () => {
        const { selectedLanguage, repos, error } = this.state;

        return !repos[selectedLanguage] && error === null;
    }

    render() {
        const { selectedLanguage, repos, error } = this.state;

        return (
            <React.Fragment>
                <LanguageNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateSelectedLanguage}
                ></LanguageNav>
                {this.isLoading() && (
                    <Loading />
                )}
                {error && <pre>{error}</pre>}
                {repos[selectedLanguage] && (
                    <GridView repos={repos[selectedLanguage]} />
                )}
            </React.Fragment>
        );
    }
}
