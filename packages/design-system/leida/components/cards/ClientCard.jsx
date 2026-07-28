import React from "react";
import { Card } from "../surfaces/Card.jsx";

/**
 * A compact client card with a title and a single CTA, using the same
 * interactive shell as the product card.
 */
export function ClientCard({
  firstName,
  lastName,
  href,
  onClick,
  onCta,
  onKeyDown,
  ctaLabel: _ctaLabel,
  role,
  tabIndex,
  style,
  ...rest
}) {
  const clickHandler = onClick || onCta;
  const isClickable = Boolean(clickHandler || href);

  function handleCardClick(event) {
    if (clickHandler) {
      clickHandler(event);
    }
    if (event.defaultPrevented || !href) {
      return;
    }
    if (typeof window !== "undefined") {
      window.location.assign(href);
    }
  }

  function handleCardKeyDown(event) {
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.defaultPrevented || !isClickable) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick(event);
    }
  }

  return (
    <Card
      variant="tile"
      padding="sm"
      hoverLift
      onClick={isClickable ? handleCardClick : onClick}
      onKeyDown={isClickable ? handleCardKeyDown : onKeyDown}
      role={isClickable ? (role || (href ? "link" : "button")) : role}
      tabIndex={isClickable ? (tabIndex ?? 0) : tabIndex}
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: isClickable ? "pointer" : undefined,
        ...style,
      }}
      {...rest}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            display: "block",
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.9rem",
            lineHeight: 0.95,
            color: "var(--leida-ink)",
          }}
        >
          {firstName}
          {lastName ? (
            <span
              style={{
                display: "block",
                fontSize: "1.1rem",
                lineHeight: 1,
                marginTop: "4px",
              }}
            >
              {lastName}
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  );
}