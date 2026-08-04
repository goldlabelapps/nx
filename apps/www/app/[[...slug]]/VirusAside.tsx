"use client";

import React from "react";
import VirusPanel from "@nx/virus/VirusPanel";
import { getFirebaseFirestore } from "../NX/lib/firebase";

export default function VirusAside() {
  const db = React.useMemo(() => getFirebaseFirestore(), []);

  return (
    <VirusPanel
      db={db}
      title="Identity channel"
      traits={{ app: "www" }}
      meta={{ route: "[[...slug]]" }}
    />
  );
}
