"use client";
import React from "react";
import { useEffect, useState } from "react";
// Custom hook to detect mobile viewport
function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth <= 800);
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return isMobile;
}
import type { IHeader } from "../types";

// import LightDark from "./LightDark";



const Header: React.FC<IHeader> = ({ title, description, icon }) => {
	const isMobile = useIsMobile();
	let iconValue = icon;
	if (icon === 'default') {
		const project = process.env.NEXT_PUBLIC_PROJECT || 'default';
		iconValue = `/${project}/favicon.svg`;
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
				{!isMobile && (
					<h2 className="goldlabel-header-description">{description}</h2>
				)}
			</div>
			{/* LightDark moved to Footer */}
		</header>
	);
};

export default Header;
