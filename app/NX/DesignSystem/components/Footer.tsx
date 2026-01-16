import React from "react";
import LightDark from "./LightDark";
const project = process.env.NEXT_PUBLIC_PROJECT || "nx";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(`../../../public/${project}/config.mjs`).default;

const Footer: React.FC = () => (
	<footer className="goldlabel-footer">

		{config.cartridges.designSystem.allowTheme && <LightDark />}
		{/* by <a href="https://goldlabel.pro" target="_blank" rel="noopener noreferrer">Goldlabel</a> */}

	</footer>
);

export default Footer;
