'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavItem {
    id: string;
    title: string;
    slug?: string;
}

interface HeaderProps {
    title: string;
    description: string;
    navItems?: NavItem[];
}

export default function Header({ title, description, navItems = [] }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="header-container">
                <Link href="/" className="logo-button" aria-label="Home">
                    <Image
                        src="/svg/favicon.svg"
                        alt={title}
                        width={50}
                        height={50}
                        priority
                    />
                </Link>

                <div className="header-text">
                    <h1>{title}</h1>
                    <h2>{description}</h2>
                </div>

                <button
                    className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <span className="menu-icon">
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                    </span>
                </button>

                <nav className={`main-navigation ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <ul>
                        {navItems.map((item) => {
                            const href = item.slug ? `/${item.slug}` : '/';
                            return (
                                <li key={item.id}>
                                    <Link href={href} onClick={() => setMobileMenuOpen(false)}>
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
