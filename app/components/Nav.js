import React from "react";
import { ThemeConsumer } from "../contexts/theme";
import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <div className={`ui secondary menu ${theme}`}>
                    <NavLink to="/" exact className="item" activeClassName='active'>Popular</NavLink>
                    <NavLink to="/battle" className="item" activeClassName='active'>Battle</NavLink>
                    <div className="right menu">
                        <div className="item">
                            <button
                                className="ui icon button"
                                onClick={toggleTheme}
                            >
                                {theme === "light" ? (
                                    <i className="lightbulb icon"></i>
                                ) : (
                                    <i className="lightbulb outline icon"></i>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ThemeConsumer>
    );
}
