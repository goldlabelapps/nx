---
order: 50
slug: /support/install
title: Install
description: Install the EchoPay Magento 2 module
icon: right
tags: Solutions, magento, EchoPay, virtual terminal, dashboard,
---
To install the EchoPay Magento 2 module on a development site running Hyvä, using Composer and Magento CLI:

1. **Require the module via Composer**

```bash
composer require echopaytechnology/echopay-payment:dev-main
```

> Replace `dev-main` with the appropriate branch or version tag if needed.

2. **Enable the module in Magento**:

```bash
bin/magento module:enable EchoPay_Payment
```

3. **Run setup upgrade to register the module**:

```bash
bin/magento setup:upgrade
```

4. **Compile dependency injection and static content** (especially relevant if in developer mode):

```bash
bin/magento setup:di:compile
bin/magento setup:static-content:deploy -f
```

5. **Clear cache**:

```bash
bin/magento cache:flush
```

After this, the EchoPay payment method should appear in the admin configuration and checkout. Since Hyvä uses standard Magento 2 checkout layouts, the module should integrate without major adjustments, but you may want to check the checkout to ensure the EchoPay button displays correctly.

If you want, I can draft a concise set of instructions you can send directly to Johnathan.
