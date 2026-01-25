"use client";
import React from "react";
import RequireAuth from "./RequireAuth";

export default function RequireAuthWrapper({ children }: { children: React.ReactNode }) {
    return <RequireAuth>{children}</RequireAuth>;
}
