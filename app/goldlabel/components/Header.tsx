"use client";
import React from "react";
import type { IHeader } from "../types";

import LightDark from "./LightDark";



const Header: React.FC<IHeader> = ({ title, description, icon }) => {
	let iconValue = icon;
	if (icon === 'mcuk') {
		iconValue = '/svg/favicon.svg';
	}

	return (
		<header className="goldlabel-header goldlabel-header-flex">
			<div className="goldlabel-header-icon-col">
				{iconValue && typeof iconValue === 'string' && iconValue.match(/^https?:\/\//) ? (
					<a href="/" className="goldlabel-header-icon-link">
						<img src={iconValue} alt="icon" className="goldlabel-header-icon-img goldlabel-header-icon-img-lg" />
					</a>
				) : iconValue && typeof iconValue === 'string' ? (
					<a href="/" className="goldlabel-header-icon-link">
						<img src={iconValue} alt="icon" className="goldlabel-header-icon-img goldlabel-header-icon-img-lg" />
					</a>
				) : iconValue ? (
					<a href="/" className="goldlabel-header-icon-link goldlabel-header-icon-img-lg">{iconValue}</a>
				) : null}
			</div>
			<div className="goldlabel-header-title-col">
				<h1>{title}</h1>
				<h2>{description}</h2>
			</div>
			<LightDark />
		</header>
	);
};

export default Header;
