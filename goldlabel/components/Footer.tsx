import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com', icon: '⚙️' },
        { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
        { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
        { name: 'Instagram', url: 'https://instagram.com', icon: '📸' },
        { name: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
    ];

    const footerLinks = [
        {
            title: 'Company',
            links: [
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact', href: '/contact' },
            ],
        },
        {
            title: 'Resources',
            links: [
                { label: 'Blog', href: '/blog' },
                { label: 'Documentation', href: '/docs' },
                { label: 'Support', href: '/support' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookie Policy', href: '/cookies' },
            ],
        },
    ];

    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-content">
                    {footerLinks.map((section) => (
                        <div key={section.title} className="footer-section">
                            <h3>{section.title}</h3>
                            <ul>
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <div className="social-links">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} UK Medical Cannabis. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
