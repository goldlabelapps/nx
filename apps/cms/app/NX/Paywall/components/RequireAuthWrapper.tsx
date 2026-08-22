"use client";
import React from "react";
import type { T_Config } from "../../types";
import RequireAuth from "./RequireAuth";

export default function RequireAuthWrapper({ children, config }: { children: React.ReactNode; config: T_Config }) {
    return <RequireAuth config={config}>{children}</RequireAuth>;
}
