import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Editable } from "./Editable";

describe("Editable Component", () => {
  it("renders children content correctly", () => {
    render(
      <Editable file="src/config/hero.config.ts">
        <span>Lorem Ipsum</span>
      </Editable>
    );

    expect(screen.getByText("Lorem Ipsum")).toBeInTheDocument();
  });

  it("shows file path indicator when hovered", () => {
    render(
      <Editable file="src/config/hero.config.ts" field="headline">
        <span>Lorem Ipsum Headline</span>
      </Editable>
    );

    const wrapper = screen.getByText("Lorem Ipsum Headline").parentElement;
    expect(wrapper).toBeInTheDocument();

    if (wrapper) {
      fireEvent.mouseEnter(wrapper);
      expect(screen.getByText("src/config/hero.config.ts")).toBeInTheDocument();
      expect(screen.getByText("[headline]")).toBeInTheDocument();

      fireEvent.mouseLeave(wrapper);
      expect(screen.queryByText("src/config/hero.config.ts")).not.toBeInTheDocument();
    }
  });
});
