"use client";

import React from "react";

import type { I_Header } from "../../types";
// Dynamically import config based on NEXT_PUBLIC_PROJECT env var
const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
// eslint-disable-next-kline @typescript-eslint/no-var-requires
const config = require(`../../../../public/${project}/config.mjs`).default;

const Header: React.FC<I_Header> = ({ title }) => {

	const iconValue = config.favicon || `/${project}/favicon.svg`;

	return (
		<header>
			<div>
				{iconValue && typeof iconValue === 'string' && iconValue.match(/^https?:\/\//) ? (
					<a href="/" aria-label="Home">
						<img src={iconValue} alt="Project icon" />
					</a>
				) : iconValue && typeof iconValue === 'string' ? (
					<a href="/" aria-label="Home">
						<img src={iconValue} alt="Project icon" />
					</a>
				) : iconValue ? (
					<a href="/" aria-label="Home">{iconValue}</a>
				) : null}
			</div>
			<div>
				<h1>{title}</h1>
			</div>
		</header>
	);
};

export default Header;
