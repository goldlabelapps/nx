"use client";

import React from "react";

import type { I_Header } from "../../types";
import config from '../../../../public/nx/config.json';
const project = 'nx';

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
