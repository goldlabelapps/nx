
import React from "react";
import type { IHeader } from "../types";

const Header: React.FC<IHeader> = ({ title, description }) => (
	<header className="goldlabel-header">
		<h1>{title}</h1>
		<h2>{description}</h2>
	</header>
);

export default Header;
