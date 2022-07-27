import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";

const Popular = React.lazy(() => import("./components/Popular"));
const Battle = React.lazy(() => import("./components/Battle"));
const Result = React.lazy(() => import("./components/Result"));

class App extends React.Component {
    state = {
        theme: "light",
        toggleTheme: () => {
            this.setState((prevState) => ({
                theme: prevState.theme === "light" ? "dark" : "light",
            }));
        },
    };

    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <main className={this.state.theme}>
                        <div className="ui container">
                            <Nav />
                            <React.Suspense fallback={<Loading/>}>
                                <Switch>
                                    <Route exact path="/" component={Popular} />
                                    <Route
                                        exact
                                        path="/battle"
                                        component={Battle}
                                    />
                                    <Route
                                        path="/battle/result"
                                        component={Result}
                                    />
                                    <Route render={() => <h1>404</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </main>
                </ThemeProvider>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
