import React from "react";
import { Text } from "../brand/Typography.jsx";

const DEFAULT_STEP_ORDER = ["Cleanse", "Treat", "Moisturise", "SPF", "Other"];
const DEFAULT_AM_PM_OPTIONS = [
  { value: "am", label: "AM only" },
  { value: "pm", label: "PM only" },
  { value: "both", label: "AM & PM" },
];

function normalizeAmPm(value) {
  if (value === "am" || value === "pm" || value === "both") {
    return value;
  }
  return "both";
}

function defaultSelectionFor(product) {
  const routineStep = String(product.routineStep || product.routine_step || "").toLowerCase();
  const productAmPm = normalizeAmPm(product.defaultAmPm || product.amPm || product.am_pm);

  return {
    productId: String(product.id),
    amPm: routineStep === "spf" ? "am" : productAmPm,
    usageNote: "",
  };
}

function groupProducts(products, stepOrder) {
  const ordered = {};
  stepOrder.forEach((step) => {
    ordered[step] = [];
  });

  const unknown = [];
  products.forEach((product) => {
    const step = product.routineStep || product.routine_step || "Other";
    if (ordered[step]) {
      ordered[step].push(product);
    } else {
      unknown.push({ ...product, routineStep: step || "Other" });
    }
  });

  if (unknown.length > 0) {
    if (!ordered.Other) {
      ordered.Other = [];
    }
    ordered.Other.push(...unknown);
  }

  return Object.entries(ordered).filter(([, items]) => items.length > 0);
}

function getProductImage(product) {
  return (
    product.thumbnail ||
    product.image ||
    product.imageUrl ||
    product.image_url ||
    product.product_image_url ||
    product.productImageUrl ||
    null
  );
}

/**
 * Product selection editor used during routine creation.
 * Each selected product can override AM/PM usage and add a usage note.
 */
export function RoutineProductSelector({
  products = [],
  value,
  defaultValue = {},
  onChange,
  stepOrder = DEFAULT_STEP_ORDER,
  amPmOptions = DEFAULT_AM_PM_OPTIONS,
  emptyLabel = "No active products in your database yet.",
  usageNotePlaceholder = "Usage note (optional), e.g. 2-3x per week",
  style,
  ...rest
}) {
  const [internalSelection, setInternalSelection] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const selection = controlled ? value : internalSelection;

  function updateSelection(next) {
    if (!controlled) {
      setInternalSelection(next);
    }
    if (onChange) {
      onChange(next);
    }
  }

  function toggleProduct(product) {
    const key = String(product.id);
    const next = { ...selection };

    if (next[key]) {
      delete next[key];
    } else {
      next[key] = defaultSelectionFor(product);
    }

    updateSelection(next);
  }

  function updateField(productId, field, valueToSet) {
    const key = String(productId);
    const current = selection[key];
    if (!current) {
      return;
    }

    updateSelection({
      ...selection,
      [key]: {
        ...current,
        [field]: valueToSet,
      },
    });
  }

  const grouped = groupProducts(products, stepOrder);

  return (
    <div style={{ display: "grid", gap: "14px", ...style }} {...rest}>
      {grouped.map(([step, stepProducts]) => (
        <section key={step} style={{ display: "grid", gap: "8px" }}>
          <Text as="p" variant="caption" color="text.secondary" style={{ margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {step}
          </Text>

          <div style={{ display: "grid", gap: "8px" }}>
            {stepProducts.map((product) => {
              const key = String(product.id);
              const selected = Boolean(selection[key]);
              const selectedData = selection[key];
              const productImage = getProductImage(product);
              const productName = product.name || product.product_name || "Product";

              return (
                <div
                  key={key}
                  style={{
                    border: `1px solid ${selected ? "var(--leida-ink)" : "var(--leida-line)"}`,
                    borderRadius: "var(--radius-lg)",
                    background: "var(--surface-card)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleProduct(product)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      border: "none",
                      background: "transparent",
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "5px",
                        border: `1.5px solid ${selected ? "var(--leida-ink)" : "var(--leida-line)"}`,
                        background: selected ? "var(--leida-ink)" : "transparent",
                        color: "white",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                        fontSize: "12px",
                        lineHeight: 1,
                        fontWeight: 700,
                      }}
                    >
                      {selected ? "\u2713" : null}
                    </span>

                    <span
                      aria-hidden="true"
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid var(--leida-line)",
                        background: "var(--leida-tile)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {typeof productImage === "string" ? (
                        <img
                          src={productImage}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : productImage ? (
                        productImage
                      ) : (
                        <Text as="span" variant="caption" color="text.secondary" style={{ fontSize: "0.55rem", margin: 0 }}>
                          IMG
                        </Text>
                      )}
                    </span>

                    <span style={{ display: "grid", gap: "2px" }}>
                      <Text as="span" variant="body2" color="text.primary" style={{ margin: 0, fontWeight: 600 }}>
                        {productName}
                      </Text>
                      {(product.brand || product.brandName) ? (
                        <Text as="span" variant="caption" color="text.secondary" style={{ margin: 0 }}>
                          {product.brand || product.brandName}
                        </Text>
                      ) : null}
                    </span>
                  </button>

                  {selected && selectedData ? (
                    <div
                      style={{
                        borderTop: "1px solid var(--leida-line)",
                        background: "rgba(255,255,255,0.55)",
                        padding: "12px 14px",
                        display: "grid",
                        gap: "10px",
                      }}
                    >
                      <Text as="p" variant="caption" color="text.secondary" style={{ margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        Usage
                      </Text>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px" }}>
                        {amPmOptions.map((option) => {
                          const active = selectedData.amPm === option.value;
                          return (
                            <button
                              key={`${key}-${option.value}`}
                              type="button"
                              onClick={() => updateField(key, "amPm", option.value)}
                              style={{
                                border: `1px solid ${active ? "var(--leida-ink)" : "var(--leida-line)"}`,
                                borderRadius: "var(--radius-md)",
                                background: active ? "var(--leida-ink)" : "transparent",
                                color: active ? "white" : "var(--leida-muted)",
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.75rem",
                                padding: "8px 6px",
                                cursor: "pointer",
                              }}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>

                      <input
                        type="text"
                        value={selectedData.usageNote || ""}
                        onChange={(event) => updateField(key, "usageNote", event.target.value)}
                        placeholder={usageNotePlaceholder}
                        style={{
                          width: "100%",
                          border: "1px solid var(--leida-line)",
                          borderRadius: "var(--radius-md)",
                          background: "rgba(255,255,255,0.9)",
                          color: "var(--leida-ink)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.82rem",
                          padding: "10px 12px",
                          boxSizing: "border-box",
                          outline: "none",
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {products.length === 0 ? (
        <div
          style={{
            border: "1px dashed var(--leida-line)",
            borderRadius: "var(--radius-lg)",
            minHeight: "120px",
            display: "grid",
            placeItems: "center",
            padding: "20px",
            background: "rgba(255,255,255,0.52)",
          }}
        >
          <Text as="p" variant="body2" color="text.secondary" style={{ textAlign: "center", margin: 0 }}>
            {emptyLabel}
          </Text>
        </div>
      ) : null}
    </div>
  );
}
