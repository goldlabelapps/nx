import React from "react";

const Footer: React.FC = () => (
	<footer style={{ textAlign: "center", padding: "2rem 0", color: "#888" }}>
		&copy; {new Date().getFullYear()} Goldlabel. All rights reserved.
	</footer>
);

export default Footer;
