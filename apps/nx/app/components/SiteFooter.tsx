export default function SiteFooter() {
	return (
		<footer className="site-footer">
			<div className="site-footer-top">
				<nav className="site-footer-columns" aria-label="Footer links">
					<section className="site-footer-section" aria-label="Company links">
						<h3>Company</h3>
						<ul>
							<li><a href="/about">About</a></li>
						</ul>
					</section>

					<section className="site-footer-section" aria-label="Product links">
						<h3>Features</h3>
						<ul>
							<li><a href="/features/design-system">Design System</a></li>
						</ul>
					</section>

					<section className="site-footer-section" aria-label="Resources links">
						<h3>Techstack</h3>
						<ul>
							<li><a href="/techstack/nextjs">NextJS</a></li>
						</ul>
					</section>

					<section className="site-footer-section" aria-label="Legal links">
						<h3>Download</h3>
						<ul>
							<li>
								<a href="https://github.com/goldlabelapps/nx" target="_blank" rel="noopener noreferrer">
									GitHub
								</a>
							</li>
						</ul>
					</section>
				</nav>
			</div>
		</footer>
	);
}