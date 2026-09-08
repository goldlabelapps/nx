import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QuickContactSection } from "./QuickContactSection";

describe("QuickContactSection", () => {
  it("renders WhatsApp message box, LinkedIn link, and simple contact form", async () => {
    render(<QuickContactSection />);
    expect(await screen.findByText(/Get in Touch/i, {}, { timeout: 8000 })).toBeInTheDocument();
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type your WhatsApp message...")).toBeInTheDocument();
    expect(screen.getByText("Open Chat (Send)")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn Profile & Messaging")).toBeInTheDocument();
    expect(screen.getByText("Send an Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your email message")).toBeInTheDocument();
  });
});

