'use client';

import { useEffect, useRef, useState } from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import Heading from '../headings/Heading';
import type { SiteFooterProps } from '../../types';

export default function Footer({ columns = [] }: SiteFooterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLElement | null>(null);

  const visibleColumns = columns
    .filter((column) => Boolean(column?.title && column?.href))
    .slice(0, 4)
    .map((column) => ({
      title: column.title,
      href: column.href,
      children: (column.children ?? []).filter((child) => Boolean(child?.title && child?.href)).slice(0, 3),
    }));

  useEffect(() => {
    if (!visibleColumns.length) {
      document.documentElement.style.setProperty('--site-footer-offset', '0px');
      document.body.style.paddingBottom = '0px';
      return;
    }

    let hasTriggered = false;
    const isVisibleRef = { current: false };

    const evaluateFooter = () => {
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const scrollHeight = document.documentElement.scrollHeight || 0;
      const threshold = scrollHeight - viewportHeight - 220;
      const contentFitsViewport = scrollHeight <= viewportHeight + 220;
      const isNearBottom = scrollTop >= threshold;
      const shouldShow = contentFitsViewport || isNearBottom;

      if (!hasTriggered && shouldShow) {
        hasTriggered = true;
        isVisibleRef.current = true;
        setIsVisible(true);
        return;
      }

      if (scrollTop <= 0 && !contentFitsViewport) {
        hasTriggered = false;
        isVisibleRef.current = false;
        setIsVisible(false);
        return;
      }

      if (hasTriggered) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleScroll = () => {
      evaluateFooter();
    };

    const updateFooterOffset = () => {
      const height = footerRef.current?.offsetHeight ?? 0;
      setFooterHeight(height);

      const offset = isVisibleRef.current ? height : 0;
      document.documentElement.style.setProperty('--site-footer-offset', `${offset}px`);
      document.body.style.paddingBottom = `${offset}px`;
    };

    const runChecks = () => {
      evaluateFooter();
      updateFooterOffset();
    };

    runChecks();

    const frameId = window.requestAnimationFrame(runChecks);
    const timer = window.setTimeout(runChecks, 0);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('resize', updateFooterOffset);
    window.addEventListener('load', runChecks);
    window.addEventListener('pageshow', runChecks);

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(updateFooterOffset)
      : null;

    if (footerRef.current && observer) {
      observer.observe(footerRef.current);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('resize', updateFooterOffset);
      window.removeEventListener('load', runChecks);
      window.removeEventListener('pageshow', runChecks);
      observer?.disconnect();
      document.documentElement.style.setProperty('--site-footer-offset', '0px');
      document.body.style.paddingBottom = '0px';
    };
  }, [visibleColumns.length]);

  if (!visibleColumns.length) {
    return null;
  }

  return (
    <AppBar
      ref={footerRef as React.Ref<HTMLElement>}
      component="footer"
      position="fixed"
      color="transparent"
      elevation={0}
      className="site-footer"
      sx={{
        top: 'auto',
        bottom: 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'transform 180ms ease, opacity 180ms ease',
        backgroundColor: 'color-mix(in srgb, var(--surface-page) 72%, transparent)',
        backdropFilter: 'blur(14px) saturate(130%)',
        WebkitBackdropFilter: 'blur(14px) saturate(130%)',
      }}
    >
      <Toolbar disableGutters className="site-footer-toolbar">
        <Box
          component="nav"
          aria-label="Footer"
          className="site-footer-columns"
          
        >
          {visibleColumns.map((column) => (
            <section
              key={`${column.href}-${column.title}`}
              aria-label={`${column.title} links`}
              className="site-footer-section"
              style={{ margin: 0 }}
            >
              <Heading as="h3" style={{ margin: '0 0 0.2rem 0', fontSize: '0.8rem', lineHeight: 1.2 }}>
                <a href={column.href}>{column.title}</a>
              </Heading>
              {column.children.length ? (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {column.children.map((child) => (
                    <li key={`${child.href}-${child.title}`}>
                      <a href={child.href}>{child.title}</a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
