import React from "react";

interface HeaderProps {
	title: string;
	description: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => (
	<header style={{ textAlign: "center", padding: "2rem 0" }}>
		<h1 style={{ margin: 0 }}>{title}</h1>
		<p style={{ color: "#888", margin: 0 }}>{description}</p>
	</header>
);

export default Header;
