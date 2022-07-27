import React from "react";
import PropTypes from "prop-types";
import Hover from "./Hover";

const style = {
    container: {
        position: "relative",
        display: "flex",
        marginBottom: "5px",
    },
    tooltip: {
        boxSizing: "border-box",
        position: "absolute",
        minWidth: "160px",
        bottom: "100%",
        left: "0",
        borderRadius: "3px",
        backgroundColor: "hsla(0,0%,20%,0.9)",
        padding: "7px",
        marginBottom: "5px",
        color: "#fff",
        textAlign: "center",
        fontSize: "14px",
    },
};

export default function ToolTip({ text, children }) {
    return (
        <Hover>
            {(hovering) => (
                <div style={style.container} className="tooltip">
                    {hovering === true && (
                        <div style={style.tooltip}>{text}</div>
                    )}
                    {children}
                </div>
            )}
        </Hover>
    );
}

ToolTip.propTypes = {
    text: PropTypes.string.isRequired,
};
