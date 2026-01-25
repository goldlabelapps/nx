---
order: 60
slug: /magento/modules
title: Modules
description: Magento Modules are also called plugins or extensions
icon: terminal
tags: echopay, terminal, api, magento, ssh, extensions, Modules, plugins
smartImage: magento
---
# Modules

> Modules extend Magento’s core functionality and are managed through both the Admin panel and CLI tools, allowing store owners to customize and control their eCommerce site.

Magento Modules (also called plugins or extensions) are packages that add specific features or functionality to a Magento store. Each module is self-contained, with its own code, configuration, and assets, and is located in the app/code or vendor directory.

Modules can provide new payment methods, shipping options, admin tools, themes, or integrations.

Each module has a registration.php and module.xml file for identification and configuration.

Modules can depend on other modules and are loaded based on their dependencies.

## Management in Magento Admin:

Modules are typically enabled, disabled, or configured via the Magento Admin panel under Stores > Configuration or System > Web Setup Wizard (Magento 2.3 and earlier).

Some modules add their own menu items or configuration sections in the Admin.

Module status (enabled/disabled) is managed via CLI commands (bin/magento module:enable, module:disable) and reflected in the Admin.

Updates and installation of modules are often handled via Composer, but some can be installed manually.