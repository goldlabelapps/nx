import React from "react";
import type { T_Config, T_Frontmatter } from '../../types';

export interface IFooterProps {
	config: T_Config;
	frontmatter?: T_Frontmatter;
}

const Footer: React.FC<IFooterProps> = ({ config, frontmatter }) => (
	<>
		{/* {config.cartridges.designSystem.allowTheme && <LightDark />} */}
		{/* You can use frontmatter here if needed */}
		by <a href="https://goldlabel.pro" target="_blank" rel="noopener noreferrer">Goldlabel</a>
	</>
);

export default Footer;
