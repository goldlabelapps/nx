import React from "react";
import { Card } from "../surfaces/Card.jsx";
import { Tag } from "../feedback/Tag.jsx";
import { Text } from "../brand/Typography.jsx";
import { BtnRoute } from "../btns/BtnRoute.jsx";
import { BtnPrimary } from "../btns/BtnPrimary.jsx";

/**
 * An aftercare product card: photo on top, then serif name, mono brand line,
 * price and a quiet buy action. Lifts on hover.
 */
export function ProductCard({
  image,
  name,
  brand,
  price,
  tag,
  href,
  showBuyButton = false,
  buyLabel = "Buy",
  buyButtonVariant = "route",
  onBuy,
  onClick,
  onKeyDown,
  role,
  tabIndex,
  style,
  ...rest
}) {
  const isClickable = Boolean(onClick || href);
  const BuyButtonComponent = buyButtonVariant === "primary" ? BtnPrimary : BtnRoute;

  function handleCardClick(event) {
    if (onClick) {
      onClick(event);
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
        minHeight: "420px",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {showBuyButton ? (
        <BuyButtonComponent
          block
          onClick={(event) => {
            event.stopPropagation();
            if (onBuy) {
              onBuy();
            }
          }}
          style={{ marginBottom: "10px" }}
        >
          {buyLabel}
        </BuyButtonComponent>
      ) : null}
      <div
        style={{
          background: "#fff",
          borderRadius: "var(--radius-lg)",
          height: "220px",
          flex: "0 0 220px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {tag ? (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 1,
            }}
          >
            <Tag>{tag}</Tag>
          </div>
        ) : null}
        {typeof image === "string" ? (
          <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          image || (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--leida-muted)" }}>
              Product photo
            </span>
          )
        )}
      </div>
      <div style={{ padding: "12px 8px 4px", display: "flex", flexDirection: "column", flex: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.6rem",
            lineHeight: 1.05,
            color: "var(--leida-ink)",
            margin: "4px 0 4px",
            minHeight: "5.04rem",
            maxHeight: "5.04rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {name}
        </span>
        {brand ? (
          <Text
            as="span"
            variant="caption"
            color="text.secondary"
            style={{ display: "block", marginTop: "8px", fontSize: "0.72rem", letterSpacing: "0.04em" }}
          >
            {brand}
          </Text>
        ) : null}
        {price ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "4px",
              paddingTop: "0",
            }}
          >
            {price ? (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--leida-ink)" }}>{price}</span>
            ) : <span />}
            <span />
          </div>
        ) : null}
      </div>
    </Card>
  );
}