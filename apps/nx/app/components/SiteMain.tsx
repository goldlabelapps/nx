import { RenderMarkdown } from '../NX/Shortcodes';

type T_SiteMainProps = {
	title: string;
	cartridge?: string;
	content: string;
	featuredImage: string | null;
	config: any;
};

export default function SiteMain({
	title,
	cartridge,
	content,
	featuredImage,
	config,
}: T_SiteMainProps) {
	return (
		<section className="site-col site-col-center" aria-label="Page content">
			<div className="site-panel site-panel-main">
				{featuredImage ? (
					<div className="site-featured-image" aria-label="Featured image" aria-hidden="true">
						<img className="site-featured-image-bg" src={featuredImage} alt="" />
					</div>
				) : null}
				{cartridge && cartridge !== 'virus' ? (
					<>
						<h2>{title} (CARTRIDGE)</h2>
						<RenderMarkdown config={config}>{content}</RenderMarkdown>
					</>
				) : (
					<RenderMarkdown config={config}>{content}</RenderMarkdown>
				)}
			</div>
		</section>
	);
}