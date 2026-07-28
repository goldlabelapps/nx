type T_SiteHeaderProps = {
	title: string;
	description?: string;
	breadcrumbItems: Array<{
		label: string;
	href?: string;
	}>;
	homeHref: string;
	logoSrc: string;
	logoAlt?: string;
	navItems: React.ReactNode;
};

export default function SiteHeader({
	title,
	description,
	breadcrumbItems,
	homeHref,
	logoSrc,
	logoAlt = '',
	navItems,
}: T_SiteHeaderProps) {
	return (
		<header className="site-header">
			<div className="site-header-top" aria-label="Main header bar">
				<div className="site-footer-brand" aria-label="Brand and overview">
					<div className="site-header-title-row">
						<a className="site-home-reset" href={homeHref} aria-label="Home and reset">
							<img src={logoSrc} alt={logoAlt} aria-hidden={true} width={100} height={100} />
						</a>
						<h1 style={{ marginBottom: '0.25rem' }}>{title}</h1>
					</div>
					{breadcrumbItems.length ? (
						<nav className="site-breadcrumbs" aria-label="Breadcrumb">
							<ol>
								{breadcrumbItems.map((item, index) => {
									const isCurrent = index === breadcrumbItems.length - 1 || !item.href;
									return (
										<li key={`${item.label}-${index}`}>
											{isCurrent ? (
												<span aria-current="page">{item.label}</span>
											) : (
												<a href={item.href}>{item.label}</a>
											)}
										</li>
									);
								})}
							</ol>
						</nav>
					) : description ? (
						<p>{description}</p>
					) : null}
				</div>

				<details className="site-header-mobile-nav site-floating-nav" aria-label="Mobile navigation">
					<summary className="site-mobile-nav-trigger">Menu</summary>
					<nav className="site-mobile-nav-panel" aria-label="Primary navigation">
						{navItems}
					</nav>
				</details>
			</div>
		</header>
	);
}