import React from "react";
import PropTypes from "prop-types";

export default function Card({ header, subheader, avatar, href, name, bio, children }) {
    return (
        <div className="ui card fluid " style={{ position: "relative" }}>
            <a className="image" target="_blank" href={href}>
                <img src={avatar} />
            </a>
            <div className="content">
                <a
                    target="_blank"
                    className="ui header aligned center huge"
                    href={href}
                >
                    {name}
                </a>
                {subheader && (
                    <div className="ui header aligned center center orange">
                        {subheader}
                    </div>
                )}
                <div className="description">{bio}</div>
            </div>
            {children}
            {header}
        </div>
    );
}

Card.propTypes = {
    header: PropTypes.object,
    subheader: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    name: PropTypes.string,
    bio: PropTypes.string
};
