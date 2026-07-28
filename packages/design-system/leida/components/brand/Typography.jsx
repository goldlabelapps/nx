import React from "react";

const VARIANTS = {
  display: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontWeight: "var(--weight-regular)",
    fontSize: "var(--type-display)",
    lineHeight: "var(--leading-tight)",
    letterSpacing: "var(--track-display)",
  },
  h1: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontWeight: "var(--weight-regular)",
    fontSize: "var(--type-h1)",
    lineHeight: "var(--leading-tight)",
    letterSpacing: "var(--track-display)",
  },
  h2: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontWeight: "var(--weight-regular)",
    fontSize: "var(--type-h2)",
    lineHeight: "var(--leading-tight)",
    letterSpacing: "var(--track-display)",
  },
  h3: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontWeight: "var(--weight-regular)",
    fontSize: "var(--type-h3)",
    lineHeight: "var(--leading-snug)",
  },
  h4: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontWeight: "var(--weight-regular)",
    fontSize: "var(--type-h3)",
    lineHeight: "var(--leading-snug)",
  },
  h5: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontWeight: "var(--weight-regular)",
    fontSize: "var(--type-h5)",
    lineHeight: "var(--leading-snug)",
  },
  h6: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontWeight: "var(--weight-regular)",
    fontSize: "var(--type-h6)",
    lineHeight: "var(--leading-snug)",
  },
  subtitle1: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--type-lede)",
    lineHeight: "var(--leading-body)",
    fontWeight: "var(--weight-medium)",
  },
  subtitle2: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--type-small)",
    lineHeight: "var(--leading-body)",
    fontWeight: "var(--weight-semibold)",
  },
  body1: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--type-body)",
    lineHeight: "var(--leading-body)",
    fontWeight: "var(--weight-regular)",
  },
  body2: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--type-small)",
    lineHeight: "var(--leading-body)",
    fontWeight: "var(--weight-regular)",
  },
  caption: {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--type-label)",
    letterSpacing: "var(--track-label)",
    lineHeight: 1.4,
    textTransform: "uppercase",
  },
  overline: {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--type-eyebrow)",
    letterSpacing: "var(--track-eyebrow)",
    lineHeight: 1.4,
    textTransform: "uppercase",
  },
};

const COLOR_MAP = {
  "text.primary": "var(--leida-ink)",
  "text.secondary": "var(--leida-muted)",
  "warning.main": "#b26a2d",
  "success.main": "#2f7c45",
  "error.main": "#b23636",
  primary: "var(--leida-ink)",
  secondary: "var(--leida-muted)",
};

const SPACING_KEYS = new Set([
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
]);

function toSpacing(value) {
  if (typeof value === "number") {
    return `${value * 8}px`;
  }
  return value;
}

function resolveResponsiveValue(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if (value.xs !== undefined) return value.xs;
    const first = Object.values(value)[0];
    return first;
  }
  return value;
}

function applySpacing(target, key, value) {
  const v = toSpacing(resolveResponsiveValue(value));
  switch (key) {
    case "m":
      target.margin = v;
      break;
    case "mt":
      target.marginTop = v;
      break;
    case "mr":
      target.marginRight = v;
      break;
    case "mb":
      target.marginBottom = v;
      break;
    case "ml":
      target.marginLeft = v;
      break;
    case "mx":
      target.marginLeft = v;
      target.marginRight = v;
      break;
    case "my":
      target.marginTop = v;
      target.marginBottom = v;
      break;
    case "p":
      target.padding = v;
      break;
    case "pt":
      target.paddingTop = v;
      break;
    case "pr":
      target.paddingRight = v;
      break;
    case "pb":
      target.paddingBottom = v;
      break;
    case "pl":
      target.paddingLeft = v;
      break;
    case "px":
      target.paddingLeft = v;
      target.paddingRight = v;
      break;
    case "py":
      target.paddingTop = v;
      target.paddingBottom = v;
      break;
    default:
      break;
  }
}

function resolveSx(sx) {
  if (!sx) {
    return {};
  }

  const blocks = Array.isArray(sx) ? sx : [sx];
  const style = {};

  blocks.forEach((block) => {
    if (!block || typeof block !== "object") {
      return;
    }

    Object.entries(block).forEach(([key, rawValue]) => {
      if (SPACING_KEYS.has(key)) {
        applySpacing(style, key, rawValue);
        return;
      }

      const value = resolveResponsiveValue(rawValue);
      if (value === undefined || value === null) {
        return;
      }

      if (key === "color" && typeof value === "string") {
        style.color = COLOR_MAP[value] || value;
        return;
      }

      style[key] = value;
    });
  });

  return style;
}

function getDefaultTag(variant) {
  if (variant === "h1") return "h1";
  if (variant === "h2") return "h2";
  if (variant === "h3") return "h3";
  if (variant === "h4") return "h4";
  if (variant === "h5") return "h5";
  if (variant === "h6") return "h6";
  if (variant === "overline" || variant === "caption") return "span";
  return "p";
}

/**
 * Leida's unified typography primitive for app and design-system usage.
 */
export const Typography = React.forwardRef(function Typography(
  {
    children,
    as,
    component,
    variant = "body1",
    color,
    gutterBottom = false,
    display,
    sx,
    style,
    ...rest
  },
  ref
) {
  const Tag = as || component || getDefaultTag(variant);
  const variantStyle = VARIANTS[variant] || VARIANTS.body1;
  const resolvedColor = color ? COLOR_MAP[color] || color : undefined;

  return (
    <Tag
      ref={ref}
      style={{
        margin: 0,
        ...variantStyle,
        ...(display ? { display } : null),
        ...(gutterBottom ? { marginBottom: "0.35em" } : null),
        ...(resolvedColor ? { color: resolvedColor } : null),
        ...resolveSx(sx),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export function Display(props) {
  return <Typography variant="display" {...props} />;
}

export function Heading(props) {
  return <Typography variant="h2" {...props} />;
}

export function Text(props) {
  return <Typography variant="body1" {...props} />;
}

export function Microcopy(props) {
  return <Typography variant="caption" {...props} />;
}
