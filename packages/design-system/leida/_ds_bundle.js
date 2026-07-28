/* @ds-bundle: {"format":4,"namespace":"LeidaDesignSystem_ab1d28","components":[{"name":"Eyebrow","sourcePath":"components/brand/Eyebrow.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"StarMark","sourcePath":"components/brand/StarMark.jsx"},{"name":"Accordion","sourcePath":"components/feedback/Accordion.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"RangeSlider","sourcePath":"components/forms/RangeSlider.jsx"},{"name":"SegmentedToggle","sourcePath":"components/forms/SegmentedToggle.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"PriceTier","sourcePath":"components/surfaces/PriceTier.jsx"},{"name":"ProductCard","sourcePath":"components/surfaces/ProductCard.jsx"},{"name":"StatCard","sourcePath":"components/surfaces/StatCard.jsx"}],"sourceHashes":{"components/brand/Eyebrow.jsx":"de7667a0e3fa","components/brand/Logo.jsx":"d294a712d927","components/brand/StarMark.jsx":"b4fc7c4d9cc9","components/feedback/Accordion.jsx":"c47b879d95f0","components/feedback/Badge.jsx":"005fead33c0e","components/feedback/Tag.jsx":"83478e0683b2","components/forms/Button.jsx":"308d98b7322c","components/forms/Input.jsx":"e6daf6e287f2","components/forms/RangeSlider.jsx":"8d48b297e953","components/forms/SegmentedToggle.jsx":"854f0fde4419","components/navigation/TopBar.jsx":"2275c96ec654","components/surfaces/Card.jsx":"e3fb9d44879e","components/surfaces/PriceTier.jsx":"d8f2067a8f28","components/surfaces/ProductCard.jsx":"9453fc434f4d","components/surfaces/StatCard.jsx":"6105737b2b24","ui_kits/aftercare-app/LivingPage.jsx":"30429a988f84","ui_kits/marketing-site/MarketingSite.jsx":"2186bcca7e2d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LeidaDesignSystem_ab1d28 = window.LeidaDesignSystem_ab1d28 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  clay: "var(--leida-clay)",
  ink: "var(--leida-ink)",
  muted: "var(--leida-muted)"
};

/**
 * A mono, all-caps, wide-tracked label - Leida's signature "eyebrow".
 */
function Eyebrow({
  children,
  tone = "clay",
  as = "block",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: as === "inline" ? "inline-block" : "block",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-eyebrow)",
      letterSpacing: "var(--track-eyebrow)",
      textTransform: "uppercase",
      color: TONES[tone] || TONES.clay,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STAR_MARK_PATH = "M363.016,126.741L363.016,126.741c-49,30.938-80.537,49.425-106.386,53.948c-7.069-24.185-4.695-58.59,0.83-111.937c-13.971,53.275-24.017,86.695-39.851,106.678c-22.963-11.048-46.62-36.682-82.476-78.408c28.295,45.473,45.492,75.342,49.761,100.16c-25.218,7.258-61.668,4.454-119.274-1.895c57.386,14.647,92.789,24.982,113.674,41.246c-11.668,23.749-38.958,48.537-84.088,86.806c48.945-30.904,80.467-49.384,106.3-53.934c7.035,24.18,4.66,58.565-0.858,111.842c13.966-53.257,24.01-86.673,39.835-106.658c23.004,11.014,46.683,36.663,82.606,78.468c-28.337-45.54-45.542-75.43-49.779-100.269c25.215-7.223,61.646-4.417,119.178,1.924c-57.285-14.621-92.663-24.947-113.562-41.161C290.592,189.802,317.882,165.012,363.016,126.741z";
const STAR_IN_WORDMARK_PATH = "M370.395,151.36c10.782,2.753,17.427,4.696,21.344,7.757c-2.203,4.442-7.311,9.086-15.745,16.238c9.148-5.775,15.049-9.228,19.888-10.097c1.329,4.545,0.886,11.007-0.154,21.038c2.634-10.047,4.529-16.325,7.52-20.076c4.325,2.067,8.776,6.878,15.534,14.744c-5.318-8.544-8.545-14.155-9.35-18.816c4.73-1.339,11.548-0.82,22.303,0.365c-10.728-2.739-17.357-4.677-21.282-7.712c2.176-4.473,7.301-9.132,15.798-16.339c-9.227,5.825-15.152,9.288-20.013,10.12c-1.317-4.543-0.873-10.999,0.164-21.005c-2.615,9.976-4.503,16.235-7.457,19.995c-4.309-2.081-8.751-6.884-15.482-14.719c5.326,8.558,8.555,14.173,9.353,18.839C388.082,153.072,381.24,152.554,370.395,151.36z";
const WORDMARK_PATH = "M641.996,318.904c-1.793,0-3.882-1.791-3.882-5.076c0-3.285,0.597-5.375,2.686-12.242l30.754-107.788l-23.588,3.285L643.19,214.7h-0.597c-2.091-14.033-12.839-20.901-22.693-20.901c-37.322,0-85.692,57.925-85.692,105.997c0,2.734,0.254,5.499,0.746,8.212c-6.247,6.89-12.513,11.494-15.668,11.494c-1.791,0-3.582-1.493-3.582-4.181c0-3.88,2.091-10.749,2.688-13.137l53.146-186.016h-5.076l-45.682,8.062l0.298,4.479c5.375-0.299,5.972-0.299,8.36-0.299c8.36,0,13.436,0.299,13.436,8.061c0,2.091-0.298,3.882-0.895,5.972l-2.091,6.568c-0.597,1.791-1.194,3.882-1.194,4.479l-15.227,52.849c-8.958-12.541-21.499-12.541-23.29-12.541c-40.607,0-88.38,58.224-88.38,102.712c0,0.584,0.015,1.175,0.037,1.771c-9.959,15.434-19.776,20.921-22.12,20.921c-2.985,0-5.374-2.686-5.374-5.374s0.299-3.882,2.091-9.854l31.65-110.176h-4.778l-45.646,8.652c-5.365-5.438-13.977-8.652-23.786-8.652c-45.242,0-83.134,51.241-86.601,91.721c-15.35,27.126-37.235,33.683-71.037,33.683h-27.171c-5.374,0-16.721,0-16.721-10.152c0-2.388,0.299-3.882,1.493-7.763l37.621-131.077c0.299-1.791,2.985-9.555,4.479-14.331c7.464-21.797,22.393-21.797,37.023-21.797l1.792-5.374h-91.665l-1.791,5.374h2.389c6.27,0,22.094,0,22.094,14.929c0,4.479-0.896,8.062-3.583,17.915c-0.299,1.194-0.896,2.985-1.194,3.284l-33.74,117.94l-4.479,14.63c-7.166,22.094-22.991,22.094-34.337,22.094v5.375h170.789l9.285-26.999c4.278,16.34,17.421,30.581,38.176,30.581c28.664,0,52.252-21.795,61.806-31.052l-3.882-3.582c-8.36,8.061-23.289,20.004-40.607,20.004c-5.673,0-31.65-2.388-31.65-34.634c0-7.466,0.896-11.048,1.792-14.63c67.778-2.39,89.275-37.621,89.275-53.745c0-3.467-0.888-6.629-2.469-9.422c3.513-0.565,4.529-0.729,6.512-0.729c7.763,0,10.749,5.673,10.749,9.853c0,2.986-0.597,5.374-2.09,10.45l-21.2,74.048c-0.597,1.791-1.194,3.882-1.194,4.479c-1.194,5.374-2.09,8.061-2.09,13.734c0,5.972,1.791,15.227,11.047,15.227c11.769,0,27.362-10.324,40.145-27.281c2.783,13.693,11.187,27.281,25.53,27.281c24.484,0,52.849-39.412,63.897-55.535l0.597,0.597l-6.867,23.289c-1.493,4.778-3.285,11.346-3.285,18.213c0,6.272,4.179,13.436,12.242,13.436c7.905,0,20.594-7.527,31.735-19.204c3.741,10.698,11.669,19.204,23.494,19.204c25.379,0,49.266-29.559,60.612-44.488l0.597,0.597c-0.597,1.493-3.882,12.242-4.479,14.63c-2.091,8.063-2.388,12.839-2.388,15.825c0,7.763,3.882,13.436,10.749,13.436c11.643,0,30.753-11.046,42.398-32.246l-4.479-2.985C655.133,312.932,646.475,318.904,641.996,318.904z M321.18,256.202c-11.944,5.673-24.484,7.166-35.233,8.063c4.479-22.394,26.873-64.792,52.849-64.792c9.853,0,14.033,7.763,14.033,13.735C352.829,226.941,340.886,246.647,321.18,256.202z M451.808,316.814c-14.63,0-14.928-17.019-14.928-22.094c0-39.412,35.531-95.247,62.403-95.247c5.374,0,17.616,4.18,17.616,20.005C516.899,256.501,475.098,316.814,451.808,316.814z M630.649,257.098c-7.165,25.08-33.44,59.418-54.64,59.418c-5.971,0-17.915-3.285-17.915-22.394c0-27.47,31.351-94.65,62.403-94.65c6.569,0,17.617,4.18,17.617,22.692c0,4.777-0.896,12.541-3.285,20.901L630.649,257.098z";
const TONES = {
  ink: "#1a1814",
  dusty: "#2c2c2a",
  offwhite: "#f7f7f4",
  current: "currentColor"
};

/**
 * The Leida logo. `variant="full"` renders the editorial italic wordmark
 * (with the sparkle over the i); `variant="mark"` renders the sparkle
 * alone. Size is driven by `height` (px); colour by `tone`.
 */
function Logo({
  variant = "full",
  height = 40,
  tone = "ink",
  style,
  ...rest
}) {
  const fill = TONES[tone] || tone;
  const isMark = variant === "mark";
  const viewBox = isMark ? "65.62 68.752 326.868 312.495" : "77 114 596 222";
  const ratio = isMark ? 326.868 / 312.495 : 596 / 222;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: viewBox,
    height: height,
    width: height * ratio,
    fill: fill,
    role: "img",
    "aria-label": "Leida",
    style: {
      display: "block",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: isMark ? STAR_MARK_PATH : STAR_IN_WORDMARK_PATH
  }), isMark ? null : /*#__PURE__*/React.createElement("path", {
    d: WORDMARK_PATH
  }));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/StarMark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STAR_PATH = "M363.016,126.741L363.016,126.741c-49,30.938-80.537,49.425-106.386,53.948c-7.069-24.185-4.695-58.59,0.83-111.937c-13.971,53.275-24.017,86.695-39.851,106.678c-22.963-11.048-46.62-36.682-82.476-78.408c28.295,45.473,45.492,75.342,49.761,100.16c-25.218,7.258-61.668,4.454-119.274-1.895c57.386,14.647,92.789,24.982,113.674,41.246c-11.668,23.749-38.958,48.537-84.088,86.806c48.945-30.904,80.467-49.384,106.3-53.934c7.035,24.18,4.66,58.565-0.858,111.842c13.966-53.257,24.01-86.673,39.835-106.658c23.004,11.014,46.683,36.663,82.606,78.468c-28.337-45.54-45.542-75.43-49.779-100.269c25.215-7.223,61.646-4.417,119.178,1.924c-57.285-14.621-92.663-24.947-113.562-41.161C290.592,189.802,317.882,165.012,363.016,126.741z";
const TONES = {
  ink: "#1a1814",
  dusty: "#2c2c2a",
  clay: "#a8927a",
  offwhite: "#f7f7f4",
  current: "currentColor"
};

/**
 * Leida's signature eight-point sparkle - the mark lifted from the
 * dot of the "i" in the wordmark. Use as an app icon, favicon, quiet
 * inter-section accent, or loading glyph.
 */
function StarMark({
  size = 24,
  tone = "ink",
  title,
  style,
  ...rest
}) {
  const fill = TONES[tone] || tone;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "65.62 68.752 326.868 312.495",
    width: size,
    height: size,
    fill: fill,
    role: title ? "img" : "presentation",
    "aria-hidden": title ? undefined : true,
    "aria-label": title,
    style: {
      display: "block",
      flex: "0 0 auto",
      ...style
    }
  }, rest), title ? /*#__PURE__*/React.createElement("title", null, title) : null, /*#__PURE__*/React.createElement("path", {
    d: STAR_PATH
  }));
}
Object.assign(__ds_scope, { StarMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/StarMark.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
/**
 * A hairline-divided disclosure list (FAQ / details). Each item has a
 * serif-italic or mono-caps summary and a rotating clay chevron.
 */
function Accordion({
  items,
  allowMultiple = false,
  summaryStyle = "serif",
  style
}) {
  const [open, setOpen] = React.useState(() => new Set());
  const toggle = i => {
    setOpen(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);else next.add(i);
      return next;
    });
  };
  const serif = summaryStyle === "serif";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(40,34,28,0.13)",
      ...style
    }
  }, items.map((item, i) => {
    const isOpen = open.has(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderBottom: "1px solid rgba(40,34,28,0.13)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggle(i),
      "aria-expanded": isOpen,
      style: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        cursor: "pointer",
        border: 0,
        background: "transparent",
        textAlign: "left",
        padding: serif ? "22px 4px" : "16px 2px",
        fontFamily: serif ? "var(--font-serif)" : "var(--font-mono)",
        fontStyle: serif ? "italic" : "normal",
        fontSize: serif ? "1.22rem" : "0.72rem",
        letterSpacing: serif ? "0" : "0.06em",
        textTransform: serif ? "none" : "uppercase",
        color: "var(--leida-ink)"
      }
    }, item.q, /*#__PURE__*/React.createElement("span", {
      style: {
        width: "10px",
        height: "10px",
        flex: "0 0 auto",
        borderRight: "1.5px solid var(--leida-clay)",
        borderBottom: "1.5px solid var(--leida-clay)",
        transform: isOpen ? "rotate(-135deg)" : "rotate(45deg)",
        transition: "transform var(--dur-mid) var(--ease-out)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows var(--dur-mid) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 4px 24px",
        fontFamily: "var(--font-sans)",
        fontSize: "0.95rem",
        lineHeight: 1.62,
        color: "var(--leida-body)",
        maxWidth: "62ch"
      }
    }, item.a))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  ink: {
    background: "var(--leida-ink)",
    color: "var(--leida-parchment)"
  },
  clay: {
    background: "var(--leida-clay)",
    color: "var(--leida-parchment)"
  }
};

/**
 * A small filled mono-caps pill for status / emphasis - e.g. "MOST POPULAR"
 * on a pricing tier, or "NEW" beside a heading.
 */
function Badge({
  children,
  tone = "ink",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--font-mono)",
      fontSize: "0.58rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1,
      ...(TONES[tone] || TONES.ink),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  frost: {
    background: "rgba(255,255,255,0.72)",
    color: "var(--leida-ink)",
    boxShadow: "0 6px 18px rgba(40,34,28,0.12)",
    backdropFilter: "var(--blur-chip)",
    WebkitBackdropFilter: "var(--blur-chip)"
  },
  clay: {
    background: "var(--leida-clay)",
    color: "var(--leida-parchment)"
  },
  outline: {
    background: "transparent",
    color: "var(--leida-ink)",
    border: "1px solid var(--leida-line)"
  }
};

/**
 * A small mono-caps tag/chip. Frosted glass by default (floats over
 * imagery), plus solid clay and hairline outline variants. Optional icon.
 */
function Tag({
  children,
  variant = "frost",
  icon,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "var(--font-mono)",
      fontSize: "0.56rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "6px 12px",
      borderRadius: "30px",
      lineHeight: 1,
      ...(VARIANTS[variant] || VARIANTS.frost),
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      lineHeight: 0
    }
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    padding: "10px 18px",
    fontSize: "0.72rem"
  },
  md: {
    padding: "15px 26px",
    fontSize: "0.78rem"
  }
};
const VARIANTS = {
  primary: {
    background: "var(--leida-ink)",
    color: "var(--leida-parchment)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-button)"
  },
  ghost: {
    background: "rgba(255,255,255,0.4)",
    color: "var(--leida-ink)",
    border: "1px solid var(--leida-line)",
    backdropFilter: "var(--blur-chip)",
    WebkitBackdropFilter: "var(--blur-chip)"
  },
  quiet: {
    background: "transparent",
    color: "var(--leida-ink)",
    border: "1px solid rgba(40,34,28,0.28)"
  }
};

/**
 * The Leida pill button. Mono, uppercase, wide-tracked label; lifts on
 * hover. Primary (ink), ghost (frosted), and quiet (hairline) variants.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  icon,
  as = "button",
  disabled = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const lift = hover && !disabled ? {
    transform: "translateY(-2px)",
    boxShadow: variant === "primary" ? "var(--shadow-button-hi)" : "var(--shadow-card)",
    background: variant === "ghost" ? "rgba(255,255,255,0.7)" : v.background
  } : null;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    disabled: Tag === "button" ? disabled : undefined,
    style: {
      display: block ? "flex" : "inline-flex",
      width: block ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: "9px",
      fontFamily: "var(--font-mono)",
      letterSpacing: "var(--track-button)",
      textTransform: "uppercase",
      borderRadius: "var(--radius-pill)",
      textDecoration: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)",
      ...v,
      ...s,
      ...lift,
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      lineHeight: 0
    }
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A rounded (pill) text input on soft paper. Optional leading label and
 * helper/error text below.
 */
function Input({
  label,
  hint,
  error,
  id,
  style,
  wrapStyle,
  ...rest
}) {
  const autoId = React.useId();
  const inputId = id || autoId;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      ...wrapStyle
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.62rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--leida-muted)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.95rem",
      color: "var(--leida-ink)",
      padding: "14px 18px",
      borderRadius: "var(--radius-pill)",
      border: `1px solid ${error ? "var(--leida-clay)" : "var(--leida-line)"}`,
      background: "rgba(251,250,247,0.92)",
      outline: "none",
      transition: "border-color var(--dur-fast)",
      ...style
    },
    onFocus: e => e.target.style.borderColor = "var(--leida-clay)",
    onBlur: e => e.target.style.borderColor = error ? "var(--leida-clay)" : "var(--leida-line)"
  }, rest)), hint || error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.62rem",
      letterSpacing: "0.04em",
      color: error ? "var(--leida-clay)" : "var(--leida-muted)",
      paddingLeft: "4px"
    }
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/RangeSlider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The "cost calculator" range slider - a 3px hairline track with a round
 * ink thumb ringed in parchment. Shows a label + serif italic value.
 */
function RangeSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  formatValue,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(value ?? min);
  const val = value ?? internal;
  const display = formatValue ? formatValue(val) : val;
  const handle = e => {
    const v = Number(e.target.value);
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  const id = React.useId();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.7rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--leida-body)"
    }
  }, label) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: "1.3rem",
      color: "var(--leida-ink)"
    }
  }, display)), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: "range",
    min: min,
    max: max,
    step: step,
    value: val,
    onChange: handle,
    className: "leida-range"
  }, rest)), /*#__PURE__*/React.createElement("style", null, `
        .leida-range { -webkit-appearance: none; appearance: none; width: 100%; height: 3px; border-radius: 3px; background: var(--leida-line); outline: none; margin: 0; }
        .leida-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 50%; background: var(--leida-ink); cursor: pointer; border: 3px solid var(--leida-parchment); box-shadow: 0 2px 8px rgba(26,24,20,0.3); }
        .leida-range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: var(--leida-ink); cursor: pointer; border: 3px solid var(--leida-parchment); box-shadow: 0 2px 8px rgba(26,24,20,0.3); }
      `));
}
Object.assign(__ds_scope, { RangeSlider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RangeSlider.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A frosted segmented control - a white pill holding 2–3 options, with the
 * active option filled ink. As used for the Morning / Evening routine toggle.
 */
function SegmentedToggle({
  options,
  value,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(value ?? options[0]?.value);
  const active = value ?? internal;
  const pick = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      gap: "4px",
      padding: "5px",
      borderRadius: "40px",
      background: "rgba(255,255,255,0.78)",
      border: "1px solid var(--leida-line)",
      boxShadow: "0 8px 30px rgba(40,34,28,0.10)",
      ...style
    },
    role: "tablist"
  }, rest), options.map(opt => {
    const on = opt.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(opt.value),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        border: 0,
        cursor: "pointer",
        padding: "9px 20px",
        borderRadius: "30px",
        transition: "all var(--dur-mid) var(--ease-out)",
        background: on ? "var(--leida-ink)" : "transparent",
        color: on ? "var(--leida-parchment)" : "var(--leida-body)"
      }
    }, opt.icon ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        lineHeight: 0
      }
    }, opt.icon) : null, opt.label);
  }));
}
Object.assign(__ds_scope, { SegmentedToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedToggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The sticky, frosted top bar from the marketing site: the Leida logo,
 * mono-caps nav links, and a primary CTA. Translucent parchment ground
 * with a blur so page texture shows through.
 */
function TopBar({
  links = [],
  cta,
  onCta,
  logoHeight = 30,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "24px",
      padding: "0 24px",
      height: "80px",
      background: "rgba(247,247,244,0.80)",
      backdropFilter: "var(--blur-bar)",
      WebkitBackdropFilter: "var(--blur-bar)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("a", {
    href: "#top",
    "aria-label": "Leida home",
    style: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    height: logoHeight
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "24px"
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: l.href,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--leida-body)",
      textDecoration: "none"
    }
  }, l.label)), cta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: onCta
  }, cta) : null));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  paper: {
    background: "var(--leida-paper)",
    border: "1px solid var(--leida-line)",
    boxShadow: "var(--shadow-card)"
  },
  glass: {
    background: "var(--leida-glass)",
    border: "1px solid rgba(255,255,255,0.75)",
    boxShadow: "var(--shadow-glass)",
    backdropFilter: "var(--blur-panel)",
    WebkitBackdropFilter: "var(--blur-panel)"
  },
  tile: {
    background: "var(--leida-tile)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "var(--blur-chip)",
    WebkitBackdropFilter: "var(--blur-chip)"
  },
  ink: {
    background: "var(--leida-ink)",
    color: "var(--leida-parchment)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-card)"
  }
};
const PADS = {
  sm: "18px",
  md: "26px 24px",
  lg: "34px 30px"
};

/**
 * The base Leida surface - a soft, generously rounded container. Paper,
 * frosted glass, tile, or ink. `hoverLift` adds the product-card rise.
 */
function Card({
  children,
  variant = "paper",
  padding = "md",
  hoverLift = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => hoverLift && setHover(true),
    onMouseLeave: () => hoverLift && setHover(false),
    style: {
      borderRadius: "var(--radius-xl)",
      padding: PADS[padding] || padding,
      transition: "transform var(--dur-mid) var(--ease-out), box-shadow var(--dur-mid) var(--ease-out)",
      ...(VARIANTS[variant] || VARIANTS.paper),
      ...(hover ? {
        transform: "translateY(-6px)",
        boxShadow: "var(--shadow-card-hover)"
      } : null),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/PriceTier.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A membership pricing tier: optional "most popular" badge, mono tier name,
 * big serif price with a mono cadence, description, feature list and CTA.
 */
function PriceTier({
  name,
  price,
  cadence,
  description,
  features = [],
  cta = "Become a member",
  onCta,
  badge,
  featured = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    variant: featured ? "ink" : "paper",
    padding: "lg",
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, rest), badge ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "-12px",
      left: "28px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: featured ? "clay" : "ink"
  }, badge)) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.7rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: featured ? "var(--leida-clay)" : "var(--leida-clay)",
      marginBottom: "14px"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "6px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: "2.6rem",
      lineHeight: 1,
      color: featured ? "var(--leida-parchment)" : "var(--leida-ink)"
    }
  }, price), cadence ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.06em",
      color: "var(--leida-muted)"
    }
  }, cadence) : null), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "0.92rem",
      color: featured ? "var(--leida-oat)" : "var(--leida-body)",
      margin: "14px 0 22px",
      flex: "0 0 auto"
    }
  }, description) : null, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: "0 0 22px",
      display: "flex",
      flexDirection: "column",
      gap: "11px",
      flex: 1
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      gap: "11px",
      alignItems: "flex-start",
      fontSize: "0.9rem",
      color: featured ? "var(--leida-oat)" : "var(--leida-body)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "65.62 68.752 326.868 312.495",
    fill: featured ? "var(--leida-clay)" : "var(--leida-clay)",
    style: {
      flex: "0 0 auto",
      marginTop: "3px"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M370.395,151.36c10.782,2.753,17.427,4.696,21.344,7.757c-2.203,4.442-7.311,9.086-15.745,16.238c9.148-5.775,15.049-9.228,19.888-10.097c1.329,4.545,0.886,11.007-0.154,21.038c2.634-10.047,4.529-16.325,7.52-20.076c4.325,2.067,8.776,6.878,15.534,14.744c-5.318-8.544-8.545-14.155-9.35-18.816c4.73-1.339,11.548-0.82,22.303,0.365c-10.728-2.739-17.357-4.677-21.282-7.712c2.176-4.473,7.301-9.132,15.798-16.339c-9.227,5.825-15.152,9.288-20.013,10.12c-1.317-4.543-0.873-10.999,0.164-21.005c-2.615,9.976-4.503,16.235-7.457,19.995c-4.309-2.081-8.751-6.884-15.482-14.719c5.326,8.558,8.555,14.173,9.353,18.839C388.082,153.072,381.24,152.554,370.395,151.36z"
  })), f))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: featured ? "ghost" : "primary",
    block: true,
    onClick: onCta,
    style: featured ? {
      background: "var(--leida-parchment)",
      color: "var(--leida-ink)"
    } : undefined
  }, cta));
}
Object.assign(__ds_scope, { PriceTier });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/PriceTier.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * An aftercare product card: photo on top, then a step eyebrow, serif name,
 * mono brand line, price and a quiet buy action. Lifts on hover.
 */
function ProductCard({
  image,
  step,
  name,
  brand,
  price,
  tag,
  buyLabel = "Buy",
  onBuy,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    variant: "tile",
    padding: "sm",
    hoverLift: true,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      ...style
    }
  }, rest), tag ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "14px",
      left: "16px",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, null, tag)) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-lg)",
      height: "220px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }
  }, typeof image === "string" ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : image || /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.6rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--leida-muted)"
    }
  }, "Product photo")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 8px 4px",
      display: "flex",
      flexDirection: "column",
      flex: 1
    }
  }, step ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.66rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--leida-clay)"
    }
  }, step) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: "1.6rem",
      lineHeight: 1.05,
      color: "var(--leida-ink)",
      margin: "9px 0 4px"
    }
  }, name), brand ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: "var(--leida-muted)"
    }
  }, brand) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "16px"
    }
  }, price ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.95rem",
      color: "var(--leida-ink)"
    }
  }, price) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("button", {
    onClick: onBuy,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.68rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--leida-ink)",
      background: "transparent",
      border: "1px solid rgba(40,34,28,0.28)",
      borderRadius: "30px",
      padding: "9px 18px",
      cursor: "pointer"
    }
  }, buyLabel))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A statement stat: a big serif-italic figure, a line of supporting copy
 * with the key figure underlined in clay, and an optional source label.
 */
function StatCard({
  figure,
  children,
  source,
  variant = "paper",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    variant: variant,
    padding: "lg",
    style: {
      textAlign: "left",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: "clamp(2.2rem, 5vw, 3rem)",
      lineHeight: 1,
      color: "var(--leida-ink)",
      marginBottom: "12px"
    }
  }, figure), children ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1.12rem",
      lineHeight: 1.5,
      margin: "0 0 14px",
      color: "var(--leida-ink)"
    }
  }, children) : null, source ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.58rem",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: "var(--leida-muted)"
    }
  }, source) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/StatCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aftercare-app/LivingPage.jsx
try { (() => {
/* Leida - Client Aftercare "living page"
   The page a client receives after a treatment. It carries the therapist's
   clinic branding; Leida sits quietly in the footer. Composes DS primitives.
   Exposes window.LivingPage. */
(function () {
  function build() {
    const DS = window.LeidaDesignSystem_ab1d28;
    const {
      SegmentedToggle,
      ProductCard,
      Accordion,
      StarMark,
      Card
    } = DS;
    const PRODUCTS = {
      am: [{
        step: "Step 01 · Cleanse",
        name: "Gentle Milk Cleanser",
        brand: "Your Clinic Range",
        price: "£24",
        hue: "#efe7dc"
      }, {
        step: "Step 02 · Serum",
        name: "Vitamin C15",
        brand: "Medik8",
        price: "£38",
        hue: "#f0e3cf",
        tag: "New"
      }, {
        step: "Step 03 · Protect",
        name: "Advanced Day SPF50",
        brand: "Heliocare",
        price: "£30",
        hue: "#e8ece2"
      }],
      pm: [{
        step: "Step 01 · Cleanse",
        name: "Balancing Gel Wash",
        brand: "Your Clinic Range",
        price: "£22",
        hue: "#e9e5df"
      }, {
        step: "Step 02 · Active",
        name: "Retinal 0.2",
        brand: "Medik8",
        price: "£45",
        hue: "#efe0da"
      }, {
        step: "Step 03 · Recover",
        name: "Ceramide Night Balm",
        brand: "Your Clinic Range",
        price: "£34",
        hue: "#eae7de"
      }]
    };
    const swatch = (hue, label) => React.createElement("div", {
      style: {
        width: "100%",
        height: "100%",
        background: hue,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: 12
      }
    }, React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "0.5rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#8a7f6d"
      }
    }, label));
    function Section({
      children,
      style
    }) {
      return React.createElement("section", {
        style: {
          padding: "10px 22px 22px",
          ...style
        }
      }, children);
    }
    function LivingPage() {
      const [tab, setTab] = React.useState("am");
      const products = PRODUCTS[tab];
      return React.createElement("div", {
        style: {
          background: "linear-gradient(180deg,#f7f7f4 0%,#f2efe8 100%)",
          minHeight: "100%",
          paddingBottom: 40,
          position: "relative"
        }
      },
      // clinic bar
      React.createElement("div", {
        style: {
          position: "sticky",
          top: 0,
          zIndex: 5,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(247,247,244,0.82)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--leida-line)"
        }
      }, React.createElement("span", {
        style: {
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "0.78rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--leida-ink)"
        }
      }, "The Skin Studio")),
      // intro
      React.createElement("div", {
        style: {
          textAlign: "center",
          padding: "40px 24px 10px"
        }
      }, React.createElement("span", {
        style: {
          display: "block",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "1.4rem",
          color: "var(--leida-body)",
          marginBottom: 6
        }
      }, "Ellie, here's your"), React.createElement("span", {
        style: {
          display: "block",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "3rem",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          color: "var(--leida-ink)"
        }
      }, "Updated Routine"), React.createElement("p", {
        style: {
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "1.02rem",
          color: "var(--leida-sign)",
          maxWidth: "30ch",
          margin: "16px auto 0",
          lineHeight: 1.5
        }
      }, "A few gentle changes after today's peel. Take it slowly, your skin will thank you."), React.createElement("div", {
        style: {
          marginTop: 14,
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "1.05rem",
          color: "var(--leida-clay)"
        }
      }, ", Nadia")),
      // products
      Section({
        style: {
          paddingTop: 26
        },
        children: [React.createElement("div", {
          key: "h",
          style: {
            textAlign: "center",
            marginBottom: 18
          }
        }, React.createElement("div", {
          className: "eyebrow",
          style: {
            marginBottom: 6
          }
        }, "Your products"), React.createElement("h2", {
          style: {
            fontSize: "1.9rem",
            margin: "0 0 16px"
          }
        }, "Morning & evening"), React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center"
          }
        }, React.createElement(SegmentedToggle, {
          options: [{
            value: "am",
            label: "Morning",
            icon: React.createElement(StarMark, {
              size: 12,
              tone: tab === "am" ? "offwhite" : "clay"
            })
          }, {
            value: "pm",
            label: "Evening"
          }],
          value: tab,
          onChange: setTab
        }))), React.createElement("div", {
          key: "list",
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginTop: 20
          }
        }, products.map((p, i) => React.createElement(ProductCard, {
          key: tab + i,
          step: p.step,
          name: p.name,
          brand: p.brand,
          price: p.price,
          tag: p.tag,
          image: swatch(p.hue, p.brand)
        })))]
      }),
      // aftercare accordion
      Section({
        children: React.createElement(Card, {
          variant: "paper",
          padding: "lg",
          style: {
            marginTop: 8
          }
        }, React.createElement("div", {
          className: "eyebrow",
          style: {
            textAlign: "center",
            marginBottom: 6
          }
        }, "Aftercare"), React.createElement("h2", {
          style: {
            fontSize: "1.7rem",
            textAlign: "center",
            margin: "0 0 18px"
          }
        }, "The next 48 hours"), React.createElement(Accordion, {
          summaryStyle: "mono",
          items: [{
            q: "Keep it simple",
            a: "Cleanse, hydrate and protect only. Skip actives and exfoliants until Thursday."
          }, {
            q: "Sun protection",
            a: "Reapply SPF50 every two hours if you're outdoors. Your skin is more sensitive right now."
          }, {
            q: "If it feels tight",
            a: "That's normal for a day or two. A thin layer of the night balm morning and evening will help."
          }]
        }))
      }),
      // close
      React.createElement("div", {
        style: {
          textAlign: "center",
          padding: "20px 24px 8px"
        }
      }, React.createElement("h2", {
        style: {
          fontSize: "2rem",
          margin: 0
        }
      }, "That's everything for now."), React.createElement("p", {
        style: {
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "1.05rem",
          color: "var(--leida-body)",
          marginTop: 14
        }
      }, "Book your review for 3 weeks' time.")),
      // footer
      React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          padding: "20px 0 8px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--leida-muted)"
        }
      }, "Powered by", React.createElement(StarMark, {
        size: 12,
        tone: "clay"
      }), React.createElement("span", {
        style: {
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          textTransform: "none",
          letterSpacing: 0,
          fontSize: "0.9rem",
          color: "var(--leida-ink)"
        }
      }, "Leida")));
    }
    window.LivingPage = LivingPage;
  }
  // Define the global only once React + the DS bundle are ready, so
  // <x-import> waits for us and never renders against an undefined DS.
  (function wait() {
    if (window.React && window.React.useState && window.LeidaDesignSystem_ab1d28) build();else setTimeout(wait, 30);
  })();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aftercare-app/LivingPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/MarketingSite.jsx
try { (() => {
/* Leida - Marketing website
   The public site: hero, how-it-works, cost calculator, pricing, FAQ,
   waitlist, footer. Composes DS primitives. Exposes window.MarketingSite. */
(function () {
  function build() {
    const DS = window.LeidaDesignSystem_ab1d28;
    const {
      TopBar,
      Button,
      PriceTier,
      Accordion,
      StatCard,
      RangeSlider,
      StarMark,
      Logo,
      Card,
      Eyebrow,
      Input
    } = DS;
    const h = React.createElement;
    function Section({
      id,
      children,
      style
    }) {
      return h("section", {
        id,
        style: {
          padding: "84px 24px",
          maxWidth: 1080,
          margin: "0 auto",
          ...style
        }
      }, children);
    }

    // A small stylised phone showing the living page hero
    function HeroPhone() {
      return h("div", {
        style: {
          width: 250,
          borderRadius: 38,
          padding: 11,
          background: "linear-gradient(160deg,#2a2620,#15130f)",
          boxShadow: "var(--shadow-float)",
          margin: "0 auto"
        }
      }, h("div", {
        style: {
          borderRadius: 28,
          overflow: "hidden",
          background: "var(--leida-paper)",
          height: 420,
          display: "flex",
          flexDirection: "column"
        }
      }, h("div", {
        style: {
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--leida-line)",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "0.62rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--leida-ink)"
        }
      }, "The Skin Studio"), h("div", {
        style: {
          padding: "28px 20px",
          textAlign: "center"
        }
      }, h("div", {
        style: {
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "1rem",
          color: "var(--leida-body)"
        }
      }, "Ellie, here's your"), h("div", {
        style: {
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "1.9rem",
          lineHeight: 0.95,
          color: "var(--leida-ink)",
          marginTop: 4
        }
      }, "Updated Routine")), h("div", {
        style: {
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: 10
        }
      }, [["Cleanse", "#efe7dc"], ["Serum", "#f0e3cf"], ["Protect", "#e8ece2"]].map(([label, hue], i) => h("div", {
        key: i,
        style: {
          display: "flex",
          gap: 10,
          alignItems: "center",
          background: "var(--leida-tile)",
          borderRadius: 16,
          padding: 8,
          boxShadow: "var(--shadow-card)"
        }
      }, h("div", {
        style: {
          width: 44,
          height: 44,
          borderRadius: 12,
          background: hue,
          flex: "0 0 auto"
        }
      }), h("div", null, h("div", {
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: "0.5rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--leida-clay)"
        }
      }, "Step 0" + (i + 1)), h("div", {
        style: {
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "0.95rem",
          color: "var(--leida-ink)"
        }
      }, label)))))));
    }
    function CostCalculator() {
      const [clients, setClients] = React.useState(25);
      const minutes = 8; // minutes saved per client not re-typing aftercare
      const hours = (clients * minutes * 4 / 60).toFixed(1); // per month
      return h(Card, {
        variant: "glass",
        padding: "lg",
        style: {
          maxWidth: 760,
          margin: "0 auto"
        }
      }, h(RangeSlider, {
        label: "Clients you see each week",
        min: 5,
        max: 80,
        value: clients,
        onChange: setClients
      }), h("div", {
        style: {
          display: "flex",
          gap: 14,
          marginTop: 26
        }
      }, h(Stat, {
        n: hours + " hrs",
        k: "Saved every month"
      }), h(Stat, {
        n: "£0",
        k: "Printing & re-sends"
      }), h(Stat, {
        n: "1 tap",
        k: "To update a routine"
      })), h("div", {
        style: {
          marginTop: 24,
          background: "var(--leida-ink)",
          color: "var(--leida-parchment)",
          borderRadius: 16,
          padding: "18px 22px",
          textAlign: "center",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "1.3rem"
        }
      }, "That's ", h("b", {
        style: {
          fontWeight: 700
        }
      }, hours, " hours"), " back for actual skin therapy."));
    }
    function Stat({
      n,
      k
    }) {
      return h("div", {
        style: {
          flex: 1,
          textAlign: "center",
          padding: "14px 8px",
          borderRadius: 14,
          background: "rgba(255,255,255,0.55)"
        }
      }, h("div", {
        style: {
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "1.5rem",
          color: "var(--leida-ink)",
          lineHeight: 1
        }
      }, n), h("div", {
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: "0.56rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--leida-muted)",
          marginTop: 7
        }
      }, k));
    }
    function Step({
      n,
      title,
      body
    }) {
      return h("div", {
        style: {
          flex: 1
        }
      }, h("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 34,
          height: 34,
          border: "1px solid var(--leida-clay)",
          borderRadius: "50%",
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          color: "var(--leida-ink)",
          marginBottom: 16
        }
      }, n), h("h3", {
        style: {
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "1.28rem",
          margin: "0 0 9px",
          color: "var(--leida-ink)"
        }
      }, title), h("p", {
        style: {
          fontSize: "0.92rem",
          lineHeight: 1.55,
          color: "var(--leida-body)",
          margin: 0
        }
      }, body));
    }
    function MarketingSite() {
      return h("div", {
        style: {
          background: "var(--leida-parchment)"
        }
      }, h("div", {
        style: {
          position: "sticky",
          top: 0,
          zIndex: 50
        }
      }, h(TopBar, {
        links: [{
          label: "How it works",
          href: "#how"
        }, {
          label: "The cost",
          href: "#calc"
        }, {
          label: "Pricing",
          href: "#join"
        }],
        cta: "Become a member"
      })),
      // HERO
      h(Section, {
        style: {
          paddingTop: 56,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 48,
          alignItems: "center"
        }
      }, h("div", null, h(Logo, {
        height: 40,
        style: {
          marginBottom: 26
        }
      }), h("h1", {
        style: {
          fontStyle: "normal",
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2.3rem,4vw,3.4rem)",
          lineHeight: 1.06,
          letterSpacing: "-0.022em",
          color: "var(--leida-ink)",
          margin: "0 0 20px"
        }
      }, "The app that gives your clients aftercare ", h("em", null, "they'll actually follow.")), h("p", {
        style: {
          fontSize: "1.06rem",
          lineHeight: 1.6,
          color: "var(--leida-body)",
          maxWidth: "44ch",
          margin: "0 0 28px"
        }
      }, "Quicker than a WhatsApp, more beautiful than a Canva PDF, and never out of date. One living page per client that updates itself and saves to their phone like an app."), h("div", {
        style: {
          display: "flex",
          gap: 14,
          flexWrap: "wrap"
        }
      }, h(Button, {
        icon: h(StarMark, {
          size: 13,
          tone: "offwhite"
        })
      }, "Become a member"), h(Button, {
        variant: "ghost"
      }, "See how it works")), h("div", {
        style: {
          marginTop: 24,
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--leida-muted)"
        }
      }, "Built by a skin therapist, for skin therapists")), h(HeroPhone)),
      // HOW IT WORKS
      h(Section, {
        id: "how",
        style: {
          paddingTop: 40
        },
        children: [h("div", {
          key: "eh",
          style: {
            textAlign: "center",
            marginBottom: 40
          }
        }, h(Eyebrow, null, "How it works"), h("h2", {
          style: {
            fontSize: "2.4rem",
            marginTop: 10
          }
        }, "Three taps, not three emails.")), h("div", {
          key: "steps",
          style: {
            display: "flex",
            gap: 34
          }
        }, h(Step, {
          n: 1,
          title: "Build the routine",
          body: "Pick products and steps from your shelf, or reuse a template you already made."
        }), h(Step, {
          n: 2,
          title: "Send one link",
          body: "The client taps once and saves the page to their home screen. No app store, no login."
        }), h(Step, {
          n: 3,
          title: "Save Changes",
          body: "Change a step after the next appointment and their page updates itself. Always current."
        }))]
      }),
      // COST
      h(Section, {
        id: "calc",
        style: {
          background: "transparent"
        },
        children: [h("div", {
          key: "e",
          style: {
            textAlign: "center",
            marginBottom: 34
          }
        }, h(Eyebrow, null, "The cost of not"), h("h2", {
          style: {
            fontSize: "2.4rem",
            marginTop: 10
          }
        }, "What re-typing aftercare really costs.")), h(CostCalculator, {
          key: "c"
        })]
      }),
      // SOCIAL PROOF
      h(Section, {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 22
        },
        children: [h(StatCard, {
          key: "s1",
          figure: "3×",
          source: "Leida pilot, 2025"
        }, "clients follow their routine when it lives on their phone."), h(StatCard, {
          key: "s2",
          figure: "9 min",
          source: "Average per client"
        }, "saved on every appointment, no PDFs, no re-typing, no reprints.")]
      }),
      // PRICING
      h(Section, {
        id: "join",
        children: [h("div", {
          key: "e",
          style: {
            textAlign: "center",
            marginBottom: 40
          }
        }, h(Eyebrow, null, "Membership"), h("h2", {
          style: {
            fontSize: "2.4rem",
            marginTop: 10
          }
        }, "One price. Every client.")), h("div", {
          key: "tiers",
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 22,
            maxWidth: 720,
            margin: "0 auto"
          }
        }, h(PriceTier, {
          key: "t1",
          name: "Solo",
          price: "£19",
          cadence: "/mo",
          description: "Everything one therapist needs to send living aftercare.",
          features: ["Unlimited living pages", "Your clinic branding", "Automatic client reminders", "Product & routine library"],
          cta: "Start free trial"
        }), h(PriceTier, {
          key: "t2",
          name: "Studio",
          price: "£39",
          cadence: "/mo",
          featured: true,
          badge: "Most popular",
          description: "For small teams sharing one shelf and one brand.",
          features: ["Everything in Solo", "Up to 4 therapists", "Shared product library", "Priority support"],
          cta: "Become a member"
        }))]
      }),
      // FAQ
      h(Section, {
        style: {
          maxWidth: 720
        },
        children: [h("div", {
          key: "e",
          style: {
            textAlign: "center",
            marginBottom: 24
          }
        }, h(Eyebrow, null, "Questions"), h("h2", {
          style: {
            fontSize: "2.2rem",
            marginTop: 10
          }
        }, "The honest answers.")), h(Accordion, {
          key: "a",
          items: [{
            q: "Do my clients need to download an app?",
            a: "No. The page saves to their home screen and opens like an app, no store, no login, no friction."
          }, {
            q: "Can I use my own branding?",
            a: "Yes. Every page carries your clinic's name and colours. Leida sits quietly in the footer."
          }, {
            q: "Is it really faster than WhatsApp?",
            a: "One tap sends a living page that stays up to date, so you never re-type or re-send a routine again."
          }, {
            q: "What if I change a product?",
            a: "Update the step once and every client on that routine sees the change instantly."
          }]
        })]
      }),
      // WAITLIST
      h(Section, {
        style: {
          textAlign: "center",
          maxWidth: 560
        },
        children: [h(StarMark, {
          key: "s",
          size: 26,
          tone: "clay",
          style: {
            margin: "0 auto 16px"
          }
        }), h("h2", {
          key: "h",
          style: {
            fontSize: "clamp(1.7rem,3vw,2.2rem)"
          }
        }, "Join the founding members."), h("p", {
          key: "p",
          style: {
            fontSize: "0.95rem",
            color: "var(--leida-body)",
            maxWidth: "42ch",
            margin: "14px auto 24px"
          }
        }, "We're onboarding solo therapists in small groups. Leave your email and we'll be in touch."), h("div", {
          key: "f",
          style: {
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap"
          }
        }, h(Input, {
          type: "email",
          placeholder: "you@clinic.com",
          wrapStyle: {
            flex: "1 1 240px",
            maxWidth: 300
          }
        }), h(Button, null, "Request access"))]
      }),
      // FOOTER
      h("footer", {
        style: {
          background: "var(--leida-ink)",
          color: "var(--leida-oat)",
          padding: "54px 24px 40px",
          marginTop: 20
        }
      }, h("div", {
        style: {
          maxWidth: 1080,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20
        }
      }, h(Logo, {
        height: 26,
        tone: "offwhite"
      }), h("div", {
        style: {
          display: "flex",
          gap: 22,
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase"
        }
      }, h("span", null, "How it works"), h("span", null, "Pricing"), h("span", null, "Contact")), h("span", {
        style: {
          width: "100%",
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.04em",
          color: "var(--leida-fog)",
          marginTop: 10
        }
      }, "© 2026 Ask Leida Ltd., Built by a skin therapist, for skin therapists."))));
    }
    window.MarketingSite = MarketingSite;
  }
  // Define the global only once React + the DS bundle are ready, so
  // <x-import> waits for us and never renders against an undefined DS.
  (function wait() {
    if (window.React && window.React.useState && window.LeidaDesignSystem_ab1d28) build();else setTimeout(wait, 30);
  })();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/MarketingSite.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.StarMark = __ds_scope.StarMark;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.RangeSlider = __ds_scope.RangeSlider;

__ds_ns.SegmentedToggle = __ds_scope.SegmentedToggle;

__ds_ns.TopBar = __ds_scope.TopBar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.PriceTier = __ds_scope.PriceTier;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.StatCard = __ds_scope.StatCard;

})();
