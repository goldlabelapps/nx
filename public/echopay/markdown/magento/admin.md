---
order: 40
slug: /magento/admin
title: Administrate
description: Using Magento's Backend
icon: terminal
tags: echopay, terminal, api, magento
smartImage: magento
---

# Magento Admin: A Beginner’s Guide (for WordPress Users)

If you’re comfortable with WordPress but new to Magento, the Magento Admin panel will feel both familiar and very different. This guide is designed to help you get started by drawing parallels to WordPress where possible.

## What is Magento Admin?
Magento Admin is the control center for your Magento store, similar to the WordPress Dashboard. Here, you manage products, customers, orders, modules (extensions), and store settings.

## Key Differences & Parallels

| WordPress                | Magento Admin                |
|--------------------------|------------------------------|
| Posts/Pages              | Products/Categories          |
| Plugins                  | Modules/Extensions           |
| Themes                   | Themes (less commonly changed) |
| Settings                 | Stores > Configuration       |
| Users                    | Customers & Admin Users      |
| Media Library            | Media Storage (under Content)|

## Common Tasks in Magento Admin

### 1. Turning On/Off the Development Store Message
**WordPress Parallel:** Maintenance Mode plugins or banners.

- Go to **Stores > Configuration > General > Design > HTML Head**
- Look for the “Demo Store Notice” and enable/disable as needed.

### 2. Managing Products (CRUD)
**WordPress Parallel:** Creating and editing Posts/Pages.

- Go to **Catalog > Products**
- Add, edit, or delete products. Each product has more options than a WordPress post (pricing, inventory, attributes, etc).

### 3. Adding New Modules (Extensions)
**WordPress Parallel:** Installing Plugins.

- Go to **System > Web Setup Wizard** (Magento 2) or use Composer for advanced installs.
- Extensions add new features, just like plugins.

### 4. Enabling/Disabling & Managing Modules
**WordPress Parallel:** Activating/Deactivating Plugins.

- Use **System > Web Setup Wizard** or command line (for advanced users):
	- `php bin/magento module:enable Vendor_ModuleName`
	- `php bin/magento module:disable Vendor_ModuleName`

### 5. Configuring Payment Systems
**WordPress Parallel:** WooCommerce Payment Settings.

- Go to **Stores > Configuration > Sales > Payment Methods**
- Enable, disable, and configure payment gateways (like EchoPay, PayPal, etc).

## Other Useful Areas

- **Sales:** Manage orders, invoices, shipments (like WooCommerce Orders)
- **Customers:** Manage customer accounts (like WordPress Users)
- **Content:** Manage CMS pages, blocks, and widgets (like WordPress Pages/Widgets)
- **Reports:** View sales, product, and customer reports

## Tips for WordPress Users

- Magento is more complex and powerful, especially for e-commerce.
- Many settings are nested under **Stores > Configuration**.
- Use the search bar at the top of the Admin panel to quickly find settings.
- Changes often require cache refreshes (System > Cache Management).

This guide covers the basics. For more details, see the other docs or Magento’s official documentation.