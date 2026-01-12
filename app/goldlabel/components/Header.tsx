"use client";

import React from "react";

import type { IHeader } from "../types";
// Dynamically import config based on NEXT_PUBLIC_PROJECT env var
const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(`../../../public/${project}/config.mjs`).default;

const Header: React.FC<IHeader> = ({ title }) => {

	const iconValue = config.favicon || `/${project}/favicon.svg`;

	return (
		<header className="nx-header nx-header-flex">
			<div className="nx-header-icon-col">
				{iconValue && typeof iconValue === 'string' && iconValue.match(/^https?:\/\//) ? (
					<a href="/" className="nx-header-icon-link" aria-label="Home">
						<img src={iconValue} alt="Project icon" className="nx-header-icon-img nx-header-icon-img-lg" />
					</a>
				) : iconValue && typeof iconValue === 'string' ? (
					<a href="/" className="nx-header-icon-link" aria-label="Home">
						<img src={iconValue} alt="Project icon" className="nx-header-icon-img nx-header-icon-img-lg" />
					</a>
				) : iconValue ? (
					<a href="/" className="nx-header-icon-link nx-header-icon-img-lg" aria-label="Home">{iconValue}</a>
				) : null}
			</div>
			<div className="nx-header-title-col">
				<h1>{title}</h1>

			</div>
		</header>
	);
};

export default Header;
