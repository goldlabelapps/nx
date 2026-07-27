type T_SiteHeaderProps = {
	siteName: string;
	description: string;
	homeHref: string;
	logoSrc: string;
	logoAlt?: string;
};

export default function SiteHeader({
	siteName,
	description,
	homeHref,
	logoSrc,
	logoAlt = '',
}: T_SiteHeaderProps) {
	return (
		<header className="site-header">
			<div className="site-header-top" aria-label="Main header bar">
				<div className="site-footer-brand" aria-label="Brand and overview">
					<h2>{siteName}</h2>
					<p>{description}</p>
				</div>

				<div className="site-brand">
					<a className="site-home-reset" href={homeHref} aria-label="Home and reset to root">
						<img src={logoSrc} alt={logoAlt} aria-hidden={true} width={50} height={50} />
					</a>
				</div>
			</div>
		</header>
	);
}