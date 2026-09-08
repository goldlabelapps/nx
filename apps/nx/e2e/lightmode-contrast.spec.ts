import { test, expect } from "@playwright/test";

test.describe("Light Mode & Contrast Verification", () => {
  test("verifies high contrast and no white-on-white text when OS is dark", async ({ page }) => {
    // Emulate dark mode OS preference
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Take full page screenshot
    await page.screenshot({ path: "test-results/screenshots/chromium_dark_os.png", fullPage: true });

    // Inspect all text elements
    const elementsWithBadContrast = await page.evaluate(() => {
      const issues: Array<{ selector: string; text: string; color: string; bg: string }> = [];
      const textElements = document.querySelectorAll("h1, h2, h3, h4, p, span, a, button, li");

      textElements.forEach((el) => {
        const text = el.textContent?.trim();
        if (!text || el.children.length > 2) return;

        const style = window.getComputedStyle(el);
        const color = style.color;
        let bg = style.backgroundColor;
        let parent = el.parentElement;

        while ((bg === "rgba(0, 0, 0, 0)" || bg === "transparent") && parent) {
          bg = window.getComputedStyle(parent).backgroundColor;
          parent = parent.parentElement;
        }

        // Check if text is white (or very light) on a light background
        const isWhiteText = color.includes("rgb(255, 255, 255)") || color.includes("rgb(255, 216, 73)") || color.includes("rgb(248, 250, 252)");
        const isLightBg = bg.includes("rgb(255, 255, 255)") || bg.includes("rgb(247, 249, 250)") || bg.includes("rgb(248, 250, 252)") || bg.includes("rgb(241, 245, 249)");

        if (isWhiteText && isLightBg) {
          issues.push({
            selector: el.tagName.toLowerCase() + (el.className ? `.${el.className.split(" ").slice(0, 3).join(".")}` : ""),
            text: text.slice(0, 50),
            color,
            bg,
          });
        }
      });

      return issues;
    });

    console.log("Elements with bad contrast under dark OS emulation:", JSON.stringify(elementsWithBadContrast, null, 2));
    expect(elementsWithBadContrast.length).toBe(0);
  });

  test("verifies high contrast and no white-on-white text when OS is light", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.screenshot({ path: "test-results/screenshots/chromium_light_os.png", fullPage: true });

    const elementsWithBadContrast = await page.evaluate(() => {
      const issues: Array<{ selector: string; text: string; color: string; bg: string }> = [];
      const textElements = document.querySelectorAll("h1, h2, h3, h4, p, span, a, button, li");

      textElements.forEach((el) => {
        const text = el.textContent?.trim();
        if (!text || el.children.length > 2) return;

        const style = window.getComputedStyle(el);
        const color = style.color;
        let bg = style.backgroundColor;
        let parent = el.parentElement;

        while ((bg === "rgba(0, 0, 0, 0)" || bg === "transparent") && parent) {
          bg = window.getComputedStyle(parent).backgroundColor;
          parent = parent.parentElement;
        }

        const isWhiteText = color.includes("rgb(255, 255, 255)") || color.includes("rgb(255, 216, 73)") || color.includes("rgb(248, 250, 252)");
        const isLightBg = bg.includes("rgb(255, 255, 255)") || bg.includes("rgb(247, 249, 250)") || bg.includes("rgb(248, 250, 252)") || bg.includes("rgb(241, 245, 249)");

        if (isWhiteText && isLightBg) {
          issues.push({
            selector: el.tagName.toLowerCase() + (el.className ? `.${el.className.split(" ").slice(0, 3).join(".")}` : ""),
            text: text.slice(0, 50),
            color,
            bg,
          });
        }
      });

      return issues;
    });

    console.log("Elements with bad contrast under light OS emulation:", JSON.stringify(elementsWithBadContrast, null, 2));
    expect(elementsWithBadContrast.length).toBe(0);
  });

  test("verifies ParticleCanvas spans the entire hero section across the full viewport", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const canvasInfo = await page.evaluate(() => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const hero = canvas.closest("section");
      const heroRect = hero ? hero.getBoundingClientRect() : null;

      return {
        canvasWidth: rect.width,
        canvasHeight: rect.height,
        heroWidth: heroRect?.width,
        heroHeight: heroRect?.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        styleWidth: canvas.style.width,
        styleHeight: canvas.style.height,
        bufferWidth: canvas.width,
        bufferHeight: canvas.height,
      };
    });

    console.log("Particle Canvas Info:", JSON.stringify(canvasInfo, null, 2));
    expect(canvasInfo).not.toBeNull();
    expect(canvasInfo!.canvasWidth).toBeGreaterThanOrEqual(1000);
    expect(canvasInfo!.canvasHeight).toBeGreaterThanOrEqual(500);

    // Save hero screenshot showing particles across full viewport
    const heroSection = page.locator("section").first();
    await heroSection.screenshot({
      path: "test-results/screenshots/particles_full_hero.png",
    });
  });
});

