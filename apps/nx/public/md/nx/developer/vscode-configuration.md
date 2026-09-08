---
order: 9042
title: VS Code Runtime Configuration
description: Overview of permanent command line arguments and runtime configurations for VS Code.
icon: Settings
tags: vscode, configuration, dev-tools
era: era-5
category: Engineering & Stack
---

# VS Code Runtime Configuration (`argv.json`)

The `argv.json` file allows developers to pass permanent runtime command line arguments to VS Code to adjust rendering performance, crash reporting, and hardware acceleration options.



## Key Settings Overview

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disable-hardware-acceleration` | `boolean` | `false` | Enables software rendering instead of hardware accelerated rendering. Useful for graphics glitches or rendering issues. |
| `enable-crash-reporter` | `boolean` | `true` | Controls whether crash reporting is sent from VS Code. Requires an app restart on change. |
| `crash-reporter-id` | `string` | *(generated)* | Unique identifier used for correlating crash reports sent from your instance. |

---

## Configuration Example

```json
{
  // Disable hardware acceleration if experiencing UI rendering issues
  // "disable-hardware-acceleration": true,

  // Enable or disable automated crash reporting
  "enable-crash-reporter": true,

  // Internal instance identifier for telemetry & crash tracking
  "crash-reporter-id": "8972479a-ca5d-44ad-a80c-9f860473940f"
}
```

---

## How to Edit in VS Code

1. Open the Command Palette (`Cmd + Shift + P` on macOS or `Ctrl + Shift + P` on Windows/Linux).
2. Run **Preferences: Configure Runtime Arguments**.
3. Modify the JSON values and **restart VS Code** for changes to take effect.
