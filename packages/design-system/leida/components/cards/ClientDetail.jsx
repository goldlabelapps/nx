import React from "react";
import { Card } from "../surfaces/Card.jsx";
import { Badge } from "../feedback/Badge.jsx";
import { Tag } from "../feedback/Tag.jsx";
import { BtnRoute } from "../btns/BtnRoute.jsx";
import { Text } from "../brand/Typography.jsx";

function getClientField(client, snakeKey, camelKey) {
  return client?.[snakeKey] ?? client?.[camelKey];
}

function hasExplicitClientField(client, snakeKey, camelKey) {
  if (!client || typeof client !== "object") return false;
  return Object.prototype.hasOwnProperty.call(client, snakeKey)
    || Object.prototype.hasOwnProperty.call(client, camelKey);
}

function shortenText(value, maxLength = 220) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength).trimEnd()}...`;
}

/**
 * A responsive client detail card with the client name, skin overview,
 * concern tags, and quick state markers for skin type and pregnancy.
 */
export function ClientDetail({ client, editHref, overviewLines, actionButton, style, ...rest }) {
  const firstName = getClientField(client, "first_name", "firstName") || "Client";
  const lastName = getClientField(client, "last_name", "lastName") || "";
  const skinType = getClientField(client, "skin_type", "skinType");
  const overview = getClientField(client, "skin_overview", "skinOverview");
  const concernTags = getClientField(client, "concern_tags", "concernTags") || [];
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const hasExplicitSkinType = hasExplicitClientField(client, "skin_type", "skinType");
  const hasSkinType = typeof skinType === "string" ? skinType.trim().length > 0 : Boolean(skinType);
  const hasOverview = typeof overview === "string" ? overview.trim().length > 0 : Boolean(overview);
  const shortenedOverview = shortenText(overview);
  const shouldClampOverview = Number.isInteger(overviewLines) && overviewLines > 0;
  const headerActionButton = actionButton || (editHref && hasOverview ? <BtnRoute as="a" href={editHref}>Edit client</BtnRoute> : null);

  return (
    <Card
      variant="paper"
      padding="lg"
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        minHeight: "100%",
        ...style,
      }}
      {...rest}
    >
      <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
        <div
          style={{
            minWidth: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Text
            as="h3"
            variant="label"
            style={{
              margin: 0,
              letterSpacing: "0.01em",
              textTransform: "none",
              fontSize: "1.7rem",
              lineHeight: 1.1,
            }}
          >
            {fullName}
          </Text>
          {headerActionButton ? <div style={{ flex: "0 0 auto" }}>{headerActionButton}</div> : null}
        </div>

        {hasExplicitSkinType && hasSkinType ? (
          <div style={{ paddingBottom: "2px" }}>
            <Badge tone="quiet">{skinType} Skin</Badge>
          </div>
        ) : null}

        {hasOverview ? (
          <p
            style={{
              margin: 0,
              fontSize: "1.02rem",
              lineHeight: 1.55,
              color: "var(--leida-ink)",
              ...(shouldClampOverview
                ? {
                    display: "-webkit-box",
                    WebkitLineClamp: overviewLines,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }
                : null),
            }}
          >
            {shortenedOverview}
          </p>
        ) : editHref ? (
          <div
            style={{
              padding: "14px 16px",
              borderRadius: "var(--radius-lg)",
              background: "rgba(255,255,255,0.55)",
              border: "1px dashed rgba(168, 146, 122, 0.42)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.5, color: "var(--leida-ink)" }}>
              No skin overview yet. Create one to keep the client summary visible at a glance.
            </p>
            <BtnRoute as="a" href={editHref} style={{ alignSelf: "flex-start" }}>
              Create skin overview
            </BtnRoute>
          </div>
        ) : null}

        {Array.isArray(concernTags) && concernTags.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Text as="p" variant="caption" color="text.secondary" style={{ margin: 0 }}>
              Concerns
            </Text>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {concernTags.map((tag, index) => (
                <Tag key={`${String(tag)}-${index}`} variant="outline" style={{ fontSize: "0.78rem", padding: "5px 10px" }}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}