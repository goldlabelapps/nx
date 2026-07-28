import React from "react";
import { SegmentedToggle } from "../forms/SegmentedToggle.jsx";
import { ProductCard } from "../cards/ProductCard.jsx";
import { Text } from "../brand/Typography.jsx";

const PERIOD_OPTIONS = [
  {
    value: "morning",
    label: "Morning",
    icon: (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
      </svg>
    ),
  },
  {
    value: "evening",
    label: "Evening",
    icon: (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
        <path d="M17 12a6 6 0 0 1-7.7 5.8A6.5 6.5 0 1 0 16.2 7 6 6 0 0 1 17 12z" />
      </svg>
    ),
  },
];

function clampIndex(index, length) {
  if (!length) {
    return 0;
  }
  if (index < 0) {
    return 0;
  }
  if (index > length - 1) {
    return length - 1;
  }
  return index;
}

/**
 * Horizontal routine product display with AM/PM switching,
 * snap scrolling, dot navigation, and touch-friendly mobile behavior.
 */
export function RoutineProductScroller({
  morningProducts = [],
  eveningProducts = [],
  period,
  defaultPeriod = "morning",
  onPeriodChange,
  showArrows = true,
  showDots = true,
  emptyLabel = "No products in this routine yet.",
  style,
  ...rest
}) {
  const [internalPeriod, setInternalPeriod] = React.useState(defaultPeriod);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const railRef = React.useRef(null);
  const currentPeriod = period ?? internalPeriod;
  const products = currentPeriod === "evening" ? eveningProducts : morningProducts;

  const updateActiveIndex = React.useCallback(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }
    const cards = Array.from(rail.children);
    if (!cards.length) {
      setActiveIndex(0);
      return;
    }

    const railBox = rail.getBoundingClientRect();
    const center = railBox.left + railBox.width / 2;
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const box = card.getBoundingClientRect();
      const cardCenter = box.left + box.width / 2;
      const distance = Math.abs(cardCenter - center);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    setActiveIndex(bestIndex);
  }, []);

  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return undefined;
    }

    const onScroll = () => {
      window.requestAnimationFrame(updateActiveIndex);
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    updateActiveIndex();

    return () => {
      rail.removeEventListener("scroll", onScroll);
    };
  }, [products, updateActiveIndex]);

  React.useEffect(() => {
    setActiveIndex((prev) => clampIndex(prev, products.length));
  }, [products.length]);

  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }
    rail.scrollLeft = 0;
    setActiveIndex(0);
  }, [currentPeriod]);

  function selectPeriod(nextPeriod) {
    if (period === undefined) {
      setInternalPeriod(nextPeriod);
    }
    if (onPeriodChange) {
      onPeriodChange(nextPeriod);
    }
  }

  function goToCard(index) {
    const rail = railRef.current;
    if (!rail) {
      return;
    }
    const cards = rail.children;
    const next = cards[index];
    if (!next) {
      return;
    }
    const railBox = rail.getBoundingClientRect();
    const cardBox = next.getBoundingClientRect();
    const delta = cardBox.left + cardBox.width / 2 - (railBox.left + railBox.width / 2);
    rail.scrollTo({ left: rail.scrollLeft + delta, behavior: "smooth" });
  }

  const hasProducts = products.length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", ...style }} {...rest}>
      <SegmentedToggle options={PERIOD_OPTIONS} value={currentPeriod} onChange={selectPeriod} />

      <div>
        <div
          ref={railRef}
          style={{
            display: "flex",
            gap: "14px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            padding: "4px 2px 10px",
            scrollbarWidth: "none",
          }}
        >
          {hasProducts
            ? products.map((product, index) => (
                <div key={product.id || `${product.name}-${index}`} style={{ flex: "0 0 min(86vw, 330px)", scrollSnapAlign: "center" }}>
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                    tag={product.tag}
                    href={product.href}
                    onClick={product.onClick}
                    style={{ minHeight: "100%" }}
                  />
                </div>
              ))
            : (
              <div
                style={{
                  width: "100%",
                  minHeight: "120px",
                  borderRadius: "var(--radius-xl)",
                  border: "1px dashed var(--leida-line)",
                  display: "grid",
                  placeItems: "center",
                  padding: "20px",
                  background: "rgba(255,255,255,0.46)",
                }}
              >
                <Text as="p" variant="body2" color="text.secondary" style={{ textAlign: "center" }}>
                  {emptyLabel}
                </Text>
              </div>
            )}
        </div>

        {hasProducts && (showArrows || showDots) ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "8px" }}>
            {showArrows ? (
              <button
                type="button"
                aria-label="Previous product"
                onClick={() => goToCard(clampIndex(activeIndex - 1, products.length))}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "999px",
                  border: "1px solid var(--leida-line)",
                  background: "rgba(255,255,255,0.7)",
                  color: "var(--leida-ink)",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                &lt;
              </button>
            ) : null}

            {showDots ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {products.map((product, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={`dot-${product.id || index}`}
                      type="button"
                      aria-label={`Go to product ${index + 1}`}
                      onClick={() => goToCard(index)}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "999px",
                        border: "0",
                        padding: "0",
                        background: isActive ? "var(--leida-ink)" : "rgba(40,34,28,0.26)",
                        transform: isActive ? "scale(1.3)" : "none",
                        transition: "transform var(--dur-fast), background var(--dur-fast)",
                        cursor: "pointer",
                      }}
                    />
                  );
                })}
              </div>
            ) : null}

            {showArrows ? (
              <button
                type="button"
                aria-label="Next product"
                onClick={() => goToCard(clampIndex(activeIndex + 1, products.length))}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "999px",
                  border: "1px solid var(--leida-line)",
                  background: "rgba(255,255,255,0.7)",
                  color: "var(--leida-ink)",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                &gt;
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}